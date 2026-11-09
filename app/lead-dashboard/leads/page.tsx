import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row, type Facet } from "@/components/dashboard/DataTable";
import { Card, Empty } from "@/components/dashboard/ui";
import { Kpi, Mix } from "@/components/dashboard/Stats";
import { IconLead, IconChat } from "@/components/dashboard/icons";
import { getWidgetData, temperature, fmtDate } from "@/lib/dashboard/convex";
import { sourceLabel, canWrite, outcomeLabel, canonicalSource } from "@/lib/dashboard/routing";
import { OutcomePicker } from "@/components/dashboard/OutcomePicker";
import { BulkOutcome } from "@/components/dashboard/BulkOutcome";
import { isDemo, demoLeads } from "@/lib/dashboard/demo";

export const dynamic = "force-dynamic";

export default async function Leads({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const params = await searchParams;
  const demo = isDemo(params);
  const { leads, reachable, hidden } = demo
    ? { leads: demoLeads(), reachable: true, hidden: 0 }
    : await getWidgetData();
  const sorted = [...leads].sort((a, b) => b.at - a.at);

  const hot = leads.filter((l) => temperature(l) === "hot").length;
  const warm = leads.filter((l) => temperature(l) === "warm").length;
  const cold = leads.length - hot - warm;
  const byVoice = leads.filter((l) => l.channel === "voice").length;
  /* People who have been here more than once. One row is one person now, so
     this is a count of humans who came back rather than of repeat rows. */
  const returning = leads.filter((l) => (l.visits ?? 1) > 1).length;

  const rows: Row[] = sorted.map((l) => ({
    id: l._id,
    q: [l.name, l.company, l.phone, l.email, l.service, l.budget, l.message,
        sourceLabel(l.sourceChannel), l.attribution?.campaign]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
    facets: {
      source: canonicalSource(l.sourceChannel),
      temp: temperature(l),
      outcome: l.outcome ?? "unset",
    },
    sort: {
      who: l.name || "",
      source: sourceLabel(l.sourceChannel),
      outcome: l.outcome ?? "",
      temp: temperature(l) === "hot" ? 0 : temperature(l) === "warm" ? 1 : 2,
      channel: l.channel,
      visits: l.visits ?? 1,
      when: l.at,
    },
    cells: [
      /* The name opens the conversation behind the lead. A row tells you what
         they wanted; only the transcript tells you how they got there, which
         is what anybody ringing them back actually needs. */
      {
        t: "link",
        v: l.name || "No name given",
        href: `/lead-dashboard/conversations/${encodeURIComponent(l.sessionId)}${demo ? "?demo=1" : ""}`,
        sub: l.company || undefined,
      },
      {
        t: "text",
        v: l.phone || l.email || "nothing left",
        sub: l.phone && l.email ? l.email : undefined,
      },
      { t: "text", v: l.service || "not said", sub: l.budget || undefined },
      /* Where they came FROM, which is a different question from how they
         are talking to us. The campaign underneath is what makes the figure
         actionable: "Facebook ad" is a channel, "Roofing, instant form" is
         something you can turn off. */
      {
        t: "text",
        v: sourceLabel(l.sourceChannel),
        sub: l.attribution?.campaign || undefined,
      },
      /* Somebody on their third visit is a different prospect from somebody
         on their first, and that was invisible while each visit made its own
         row. */
      {
        t: "text",
        v: (l.visits ?? 1) === 1 ? "first time" : `${l.visits} visits`,
        sub:
          (l.visits ?? 1) > 1 && l.firstAt
            ? `since ${new Date(l.firstAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                timeZone: "Europe/London",
              })}`
            : undefined,
        strong: (l.visits ?? 1) > 1,
        nowrap: true,
      },
      { t: "pill", v: temperature(l) },
      /* The one field a person owns. Everything else on this row was written
         by the assistant; this is the answer to "did it turn into anything",
         and it is what the channel report ranks on. */
      {
        t: "node",
        v: (
          <OutcomePicker
            leadId={l._id}
            outcome={l.outcome ?? null}
            valueGbp={l.valueGbp ?? null}
            canWrite={canWrite && !demo}
          />
        ),
      },
      { t: "text", v: fmtDate(l.at), nowrap: true },
    ],
  }));

  const tally = (pick: (l: (typeof leads)[number]) => string) => {
    const m = new Map<string, number>();
    for (const l of leads) {
      const v = pick(l);
      m.set(v, (m.get(v) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };

  const channelFacet: Facet = {
    key: "source",
    label: "Came from",
    options: tally((l) => canonicalSource(l.sourceChannel)).map(([value, count]) => ({
      value,
      label: sourceLabel(value),
      count,
    })),
  };

  const facets: Facet[] = [
    {
      key: "outcome",
      label: "What came of it",
      options: tally((l) => l.outcome ?? "unset").map(([value, count]) => ({
        value,
        label: value === "unset" ? "Not set" : outcomeLabel(value),
        count,
      })),
    },
    {
      key: "temp",
      label: "Temperature",
      options: tally((l) => temperature(l)).map(([value, count]) => ({
        value,
        label: value[0].toUpperCase() + value.slice(1),
        count,
      })),
    },
  ];

  return (
    <Shell
      active="/lead-dashboard/leads"
      demo={demo}
      title="Leads"
      lead="Everyone the assistant captured, by chat or by phone, with how warm they were when they left."
      counts={{ "/lead-dashboard/leads": leads.length }}
    >
      {!reachable ? (
        <Empty>The lead store could not be reached just now, so this list is not current.</Empty>
      ) : (
        <>
          {/* items-start: without it the three cards stretch to the height
              of the taller mix card beside them and read as empty boxes. */}
          <div className="mb-4 grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="grid gap-3 sm:grid-cols-3">
              <Kpi label="Leads captured" value={String(leads.length)} icon={IconLead} accent />
              <Kpi
                label="Ready to buy"
                value={String(hot)}
                sub={leads.length ? `${Math.round((hot / leads.length) * 100)}% of leads` : undefined}
                icon={IconLead}
              />
              <Kpi
                label="Came back"
                value={String(returning)}
                sub={returning === 0 ? "nobody has returned yet" : "more than one visit"}
                icon={IconChat}
              />
            </div>
            <Card title="Mix" note={`${byVoice} by phone, ${leads.length - byVoice} by chat`}>
              <Mix
                parts={[
                  { label: "Hot", value: hot, fill: "#c4572f" },
                  { label: "Warm", value: warm, fill: "var(--accent)" },
                  { label: "Cold", value: cold, fill: "var(--color-line)" },
                ]}
              />
            </Card>
          </div>

          <DataTable
            columns={[
              /* No widths. Seven columns adding up to more than a hundred per
                 cent squeezed every one of them: headings wrapped to three
                 lines and "around 600 a month" broke after every word. The
                 table sizes itself from the content, and minWidth below keeps
                 it readable rather than compressed. */
              { label: "Who", key: "who" },
              { label: "Contact" },
              { label: "What they wanted" },
              { label: "Came from", key: "source" },
              { label: "Been here", key: "visits" },
              { label: "Temperature", key: "temp" },
              { label: "What came of it", key: "outcome" },
              { label: "When", key: "when" },
            ]}
            rows={rows}
            minWidth={1060}
            facets={facets}
            picker={channelFacet}
            /* Passing this is what turns the tick boxes on. Filter to one
               channel, select what is on screen, mark the lot: the loop this
               screen exists for. */
            bulk={<BulkOutcome canWrite={canWrite && !demo} demo={demo} />}
            searchPlaceholder="Search name, company, service, campaign"
            empty="No leads captured yet."
            footnote={
              <>
                Click a name to read the conversation behind it.
                {hidden > 0 && ` ${hidden} test ${hidden === 1 ? "row" : "rows"} not listed.`}
              </>
            }
          />
        </>
      )}
    </Shell>
  );
}
