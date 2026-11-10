/* =========================================================================
   A small in-memory stand-in for Convex's db, enough to drive the routing
   engine's own handlers.

   Why this exists: the engine's correctness is almost entirely about ordering
   and atomicity (a lease held, a stale token refused, an idempotency key
   honoured). Those cannot be checked by reading the code, and they cannot be
   checked against the live deployment without sending real texts. So the
   handlers are driven directly, as `fn._handler(ctx, args)`.

   The index definitions below mirror schema.ts. They are declared rather than
   derived, which means they can drift from it; the test suite therefore
   asserts that every index it relies on is actually present in schema.ts.
   ========================================================================= */

export type Row = Record<string, any>;

/* Only the indexes the engine actually queries. Asserted against schema.ts. */
export const INDEXES: Record<string, Record<string, string[]>> = {
  sequences: {
    by_due: ["status", "nextDueAt"],
    by_lead: ["leadId"],
    by_route: ["route"],
  },
  touches: {
    by_lead_at: ["leadId", "at"],
    by_provider: ["providerId"],
    by_idem: ["idempotencyKey"],
    by_channel_at: ["channel", "at"],
  },
  leads: {
    by_at: ["at"],
    by_status: ["status"],
    by_session: ["sessionId"],
    by_phone_key: ["phoneKey"],
    by_email_key: ["emailKey"],
    by_source_channel: ["sourceChannel"],
  },
  bookings: {
    by_reference: ["reference"],
    by_session: ["sessionId"],
    by_status: ["status"],
    by_date: ["preferredDate"],
  },
  sessions: {
    by_session: ["sessionId"],
    by_channel: ["channel"],
    by_visitor: ["visitorId"],
    by_handover: ["handover"],
  },
  messages: {
    by_session: ["sessionId"],
    by_session_at: ["sessionId", "at"],
  },
  suppressions: { by_key: ["key"] },
  settings: { by_key: ["key"] },
  consentEvents: {
    by_lead: ["leadId"],
    by_phone: ["phoneKey"],
    by_email: ["emailKey"],
  },
};

type Constraint = { op: "eq" | "lt" | "lte" | "gt" | "gte"; field: string; value: any };

class RangeBuilder {
  constraints: Constraint[] = [];
  eq(field: string, value: any) { this.constraints.push({ op: "eq", field, value }); return this; }
  lt(field: string, value: any) { this.constraints.push({ op: "lt", field, value }); return this; }
  lte(field: string, value: any) { this.constraints.push({ op: "lte", field, value }); return this; }
  gt(field: string, value: any) { this.constraints.push({ op: "gt", field, value }); return this; }
  gte(field: string, value: any) { this.constraints.push({ op: "gte", field, value }); return this; }
}

function matches(row: Row, c: Constraint): boolean {
  const v = row[c.field];
  switch (c.op) {
    case "eq": return v === c.value;
    /* Convex excludes rows missing the field from a range bound, which matters:
       a sequence with no nextDueAt must not come back as "due". */
    case "lt": return v !== undefined && v < c.value;
    case "lte": return v !== undefined && v <= c.value;
    case "gt": return v !== undefined && v > c.value;
    case "gte": return v !== undefined && v >= c.value;
  }
}

function cmpBy(fields: string[]) {
  return (a: Row, b: Row) => {
    for (const f of fields) {
      const x = a[f], y = b[f];
      if (x === y) continue;
      if (x === undefined) return -1;
      if (y === undefined) return 1;
      return x < y ? -1 : 1;
    }
    return a._creationTime - b._creationTime;
  };
}

class Q {
  private rows: Row[];
  private sortFields: string[] | null = null;
  private dir: "asc" | "desc" = "asc";
  constructor(rows: Row[]) { this.rows = rows; }

  withIndex(name: string, fn?: (q: RangeBuilder) => RangeBuilder) {
    const table = this.rows[0]?.__table ?? this.tableHint;
    const fields = INDEXES[table]?.[name];
    if (!fields) throw new Error(`mock: no index "${name}" declared for table "${table}"`);
    this.sortFields = fields;
    if (fn) {
      const rb = fn(new RangeBuilder());
      for (const c of rb.constraints) {
        if (!fields.includes(c.field)) {
          throw new Error(`mock: index "${name}" cannot constrain "${c.field}"`);
        }
        this.rows = this.rows.filter((r) => matches(r, c));
      }
    }
    return this;
  }
  tableHint = "";
  order(dir: "asc" | "desc") { this.dir = dir; return this; }

  private resolved(): Row[] {
    const out = [...this.rows].sort(cmpBy(this.sortFields ?? ["_creationTime"]));
    return this.dir === "desc" ? out.reverse() : out;
  }
  async collect() { return this.resolved(); }
  async take(n: number) { return this.resolved().slice(0, n); }
  async first() { return this.resolved()[0] ?? null; }
  async unique() {
    const r = this.resolved();
    if (r.length > 1) throw new Error("mock: unique() matched more than one row");
    return r[0] ?? null;
  }
}

export class MockDb {
  tables: Record<string, Row[]> = {};
  private seq = 0;
  /** Bumped on every write, so a test can assert "nothing was written". */
  writes = 0;

  private table(name: string) {
    if (!this.tables[name]) this.tables[name] = [];
    return this.tables[name];
  }

  query(name: string) {
    const q = new Q(this.table(name).map((r) => ({ ...r })));
    q.tableHint = name;
    return q as any;
  }

  async get(id: string) {
    for (const name of Object.keys(this.tables)) {
      const hit = this.tables[name].find((r) => r._id === id);
      if (hit) return { ...hit };
    }
    return null;
  }

  async insert(name: string, doc: Row) {
    const _id = `${name}:${++this.seq}`;
    this.table(name).push({
      ...doc,
      _id,
      _creationTime: Date.now() + this.seq / 1000,
      __table: name,
    });
    this.writes++;
    return _id;
  }

  async patch(id: string, patch: Row) {
    for (const name of Object.keys(this.tables)) {
      const i = this.tables[name].findIndex((r) => r._id === id);
      if (i >= 0) {
        /* Convex treats an explicit `undefined` in a patch as "remove this
           field", which the engine relies on when it clears a lease. */
        const next = { ...this.tables[name][i] };
        for (const [k, v] of Object.entries(patch)) {
          if (v === undefined) delete next[k];
          else next[k] = v;
        }
        this.tables[name][i] = next;
        this.writes++;
        return;
      }
    }
    throw new Error(`mock: patch on unknown id ${id}`);
  }

  async replace(id: string, doc: Row) { return this.patch(id, doc); }
  async delete(id: string) {
    for (const name of Object.keys(this.tables)) {
      const i = this.tables[name].findIndex((r) => r._id === id);
      if (i >= 0) { this.tables[name].splice(i, 1); this.writes++; return; }
    }
  }

  /** Read a table directly, for assertions. */
  all(name: string) { return (this.tables[name] ?? []).map((r) => ({ ...r })); }
}

export function ctx() {
  const db = new MockDb();
  /* `runMutation`, because real Convex has it and some of our mutations call
     each other through it: `setOutcomeMany` calls `setOutcome` per lead so
     that the fiddly mapping from an outcome to the pipeline status exists in
     exactly one place.

     Without this the mock simply threw, which meant the bulk path had no
     test at all and nobody noticed. It runs the handler against the same ctx,
     which is what Convex does inside one transaction. */
  const c: any = { db };
  c.runMutation = (fn: any, args: any) => fn._handler(c, args);
  c.runQuery = (fn: any, args: any) => fn._handler(c, args);
  return { db, ctx: c };
}
