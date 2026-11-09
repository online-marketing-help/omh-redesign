import Link from "next/link";
import { Shell } from "@/components/dashboard/Shell";
import { Card, Empty } from "@/components/dashboard/ui";
import { Funnel } from "@/components/dashboard/Funnel";
import { DataTable, type Row, type Facet } from "@/components/dashboard/DataTable";
import { IconBack } from "@/components/dashboard/icons";
import {
  getCampaign, money, when, outcomeLabel, stopReasonLabel,
  type CampaignPerson, type Campaign,
} from "@/lib/dashboard/routing";
import { totals, verdict } from "@/lib/dashboard/campaign-report";
import { isDemo, demoCampaigns } from "@/lib/dashboard/demo";
import { isTestRow } from "@/lib/dashboard/test-rows";

export const dynamic = "force-dynamic";

/* Everyone on one campaign.

   The list screen answers "did it work". This answers "who, and what
   happened to them", which is the screen somebody opens when the answer to
   the first question was no. */

/** What happened to this person, in words. One column, not four flags. */
function fate(p: CampaignPerson): { word: string; note: string | null } {
  if (p.optedOut) return { word: "Asked to stop", note: "suppressed, will not be contacted again" };
  if (p.bookings > 0) return { word: "Booked", note: p.outcome ? outcomeLabel(p.outcome) : null };
  if (p.replied) return { word: "Replied", note: when(p.firstReplyAt) };
  if (p.failed > 0 && p.sent === 0) return { word: "Never arrived", note: "the send failed" };
  if (p.status === "active" || p.status === "paused") {
    return { word: "Still going", note: `step ${p.step + 1}` };
  }
  if (p.sent > 0) return { word: "No answer", note: stopReasonLabel(p.stopReason) };
  return { word: "Not contacted", note: stopReasonLabel(p.stopReason) };
}

export default async function CampaignPage({
  params,
  searchParams,
}: {
  params: Promise<{ campaign: string }>;
  searchParams: Promise<{ demo?: string }>;
}) {
  const { campaign: id } = await params;
  const sp = await searchParams;
  const demo = isDemo(sp);

  let campaign: Campaign | null = null;
  let people: CampaignPerson[] = [];
  let reachable = true;

  if (demo) {
    const row = demoCampaigns().rows.find((r) => r.id === id);
    if (row) {
      const { people: p, ...rest } = row;
      campaign = rest;
      people = p;
    }
  } else {
    const got = await getCampaign(id);
    reachable = got !== null;
    if (got) {
      campaign = got.campaign;
      people = got.people;
    }
  }

  const all = people;
  const rows = demo
    ? all
    : all.filter((p) => !isTestRow({ name: p.name, email: p.email ?? undefined }));
  const hidden = all.length - rows.length;

  const t = totals(rows, campaign?.intended ?? null);
  const say = campaign ? verdict(t) : null;

  const back = `/lead-dashboard/campaigns${demo ? "?demo=1" : ""}`;

  const tableRows: Row[] = [...rows]
    .sort((a, b) => b.enrolledAt - a.enrolledAt)
    .map((p) => {
      const f = fate(p);
      return {
        id: p.sequenceId,
        q: [p.name, p.phone, p.email, f.word, p.outcome].filter(Boolean).join(" ").toLowerCase(),
        facets: { fate: f.word, outcome: p.outcome ?? "unset" },
        sort: {
          who: p.name,
          fate: f.word,
          sent: p.sent,
          value: p.valueGbp ?? 0,
          when: p.enrolledAt,
        },
        cells: [
          { t: "text", v: p.name || "No name", sub: p.phone ?? p.email ?? undefined, strong: true },
          { t: "text", v: f.word, sub: f.note ?? undefined, nowrap: true },
          { t: "num", v: p.sent ? String(p.sent) : "" },
          { t: "text", v: p.outcome ? outcomeLabel(p.outcome) : "not set" },
          { t: "num", v: p.valueGbp ? money(p.valueGbp) : "" },
          { t: "text", v: when(p.enrolledAt), nowrap: true },
        ],
      };
    });

  const tally = (pick: (p: CampaignPerson) => string) => {
    const m = new Map<string, number>();
    for (const p of rows) m.set(pick(p), (m.get(pick(p)) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };

  const facets: Facet[] = [
    {
      key: "fate",
      label: "What happened",
      options: tally((p) => fate(p).word).map(([value, count]) => ({
        value,
        label: value,
        count,
      })),
    },
    {
      key: "outcome",
      label: "What came of it",
      options: tally((p) => p.outcome ?? "unset").map(([value, count]) => ({
        value,
        label: value === "unset" ? "Not set" : outcomeLabel(value),
        count,
      })),
    },
  ];

  return (
    <Shell
      active="/lead-dashboard/campaigns"
      title={campaign?.name ?? "Campaign"}
      lead={campaign?.audience ?? undefined}
      demo={demo}
      toolbar={
        <Link
          href={back}
          className="inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-lg border border-line bg-surface px-3 text-[13px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <IconBack className="h-4 w-4" />
          All campaigns
        </Link>
      }
    >
      {!reachable ? (
        <Card>
          <Empty>The routing store cannot be reached from here.</Empty>
        </Card>
      ) : !campaign ? (
        <Card title="Not found">
          <Empty>
            There is no campaign with that reference. It may have been deleted.
          </Empty>
        </Card>
      ) : (
        <>
          <Card rise={0}>
            {say && (
              <p className="mb-4 max-w-[70ch] font-sans text-[16px] font-semibold leading-snug tracking-[-.01em] text-ink">
                {say}
              </p>
            )}
            <Funnel totals={t} />
          </Card>

          <div className="mt-5">
            <DataTable
              columns={[
                { label: "Who", key: "who" },
                { label: "What happened", key: "fate" },
                { label: "Messages", key: "sent", align: "right" },
                { label: "What came of it" },
                { label: "Value", key: "value", align: "right" },
                { label: "Enrolled", key: "when" },
              ]}
              rows={tableRows}
              minWidth={860}
              facets={facets}
              searchPlaceholder="Search name, number, email"
              empty="Nobody is on this campaign."
              footnote={
                <>
                  Everyone enrolled, newest first.
                  {hidden > 0 && ` ${hidden} test ${hidden === 1 ? "row" : "rows"} not listed.`}
                </>
              }
            />
          </div>
        </>
      )}
    </Shell>
  );
}
