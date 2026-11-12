import Link from "next/link";
import { Shell } from "@/components/dashboard/Shell";
import { Card, Empty, ShowExample, Pill } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { Funnel } from "@/components/dashboard/Funnel";
import { IconSend, IconChat, IconCalendar, IconAlert } from "@/components/dashboard/icons";
import { getCampaigns, money, when, type CampaignRow } from "@/lib/dashboard/routing";
import { totals, verdict } from "@/lib/dashboard/campaign-report";
import { isDemo, demoCampaigns } from "@/lib/dashboard/demo";
import { isTestRow } from "@/lib/dashboard/test-rows";

export const dynamic = "force-dynamic";

/* =========================================================================
   Campaigns: what happened when we contacted a list on purpose.

   Reactivation is one of the seven capabilities the package sells, and until
   this screen existed the question it exists to answer had no answer: a batch
   was a set of unrelated follow-up rows that happened to share an afternoon.

   The thing that makes this screen different from every other report here is
   that **the bad number is given the same prominence as the good one.** A
   campaign that books three appointments and burns forty permissions has lost
   more than it made. Every other screen can rank by what went well; this one
   cannot, so opted-out sits in the headline figures and in the funnel rather
   than in a footnote.
   ========================================================================= */

const KIND_WORD: Record<string, string> = {
  reactivation: "Reactivation",
  announcement: "Announcement",
  test: "Test batch",
  other: "Other",
};

const BASIS_WORD: Record<string, string> = {
  soft_optin: "Soft opt-in",
  explicit: "Explicit consent",
  mixed: "Mixed",
};

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const params = await searchParams;
  const demo = isDemo(params);

  const data = demo ? demoCampaigns() : await getCampaigns(50);
  const campaigns = data?.rows ?? [];

  /* Test rows come out before anything is counted, by the one shared rule.
     A reactivation list is imported from a spreadsheet, so our own trial
     imports are exactly the kind of thing that ends up in here. */
  const clean: CampaignRow[] = demo
    ? campaigns
    : campaigns.map((c) => ({
        ...c,
        people: c.people.filter(
          (p) => !isTestRow({ name: p.name, email: p.email ?? undefined }),
        ),
      }));
  const hidden = campaigns.reduce((n, c) => n + c.people.length, 0) -
    clean.reduce((n, c) => n + c.people.length, 0);

  const sums = clean.map((c) => ({ c, t: totals(c.people, c.intended) }));

  const reachedAll = sums.reduce((n, s) => n + s.t.reached, 0);
  const bookedAll = sums.reduce((n, s) => n + s.t.booked, 0);
  const optedOutAll = sums.reduce((n, s) => n + s.t.optedOut, 0);
  const valueAll = sums.reduce((n, s) => n + s.t.value, 0);
  const running = clean.filter((c) => c.status === "running").length;

  const unreachable = !demo && data === null;
  const nothing = !unreachable && clean.length === 0;

  return (
    <Shell
      active="/lead-dashboard/campaigns"
      title="Campaigns"
      lead="Every batch we contacted on purpose, and what it cost as well as what it made."
      toolbar={
        <Link
          href={demo ? "/lead-dashboard/campaigns/new?demo=1" : "/lead-dashboard/campaigns/new"}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-inverse px-3 py-1.5 text-[13.5px] font-semibold text-oninverse outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          Start a campaign
        </Link>
      }
      counts={{ "/lead-dashboard/campaigns": running || undefined }}
      urgent={running ? ["/lead-dashboard/campaigns"] : []}
      demo={demo}
    >
      {unreachable ? (
        <Card>
          <Empty>
            The routing store cannot be reached from here, so this report is
            empty rather than wrong.
          </Empty>
        </Card>
      ) : nothing ? (
        <Card title="No campaigns yet">
          <Empty>
            A campaign is a list contacted on purpose, which in practice means
            reactivation. Nothing has been run yet.
          </Empty>
          <div className="pb-5 text-center">
            <Link
              href={demo ? "/lead-dashboard/campaigns/new?demo=1" : "/lead-dashboard/campaigns/new"}
              className="inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-inverse px-4 text-[14px] font-semibold text-oninverse outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              Start the first one
            </Link>
          </div>
          <div className="text-center">
            <ShowExample href="/lead-dashboard/campaigns?demo=1" />
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi
              label="People reached"
              value={String(reachedAll)}
              sub={`across ${clean.length} ${clean.length === 1 ? "campaign" : "campaigns"}`}
              icon={IconSend}
              accent
              rise={0}
            />
            <Kpi
              label="Appointments"
              value={String(bookedAll)}
              sub={valueAll ? `${money(valueAll)} signed` : "none signed yet"}
              icon={IconCalendar}
              rise={1}
            />
            {/* Beside the bookings, not under them. This is the figure a
                reactivation run actually spends, and it does not come back. */}
            <Kpi
              label="Asked to stop"
              value={String(optedOutAll)}
              sub={
                reachedAll
                  ? `${((optedOutAll / reachedAll) * 100).toFixed(1)}% of those reached, target under 2%`
                  : "nobody reached yet"
              }
              icon={IconAlert}
              accent={reachedAll > 0 && optedOutAll / reachedAll >= 0.02}
              goodWhenUp={false}
              rise={2}
            />
            <Kpi
              label="Running now"
              value={running ? String(running) : "none"}
              sub={running ? "messages still going out" : "nothing is sending"}
              icon={IconChat}
              rise={3}
            />
          </div>

          <ul className="mt-5 flex flex-col gap-5">
            {sums.map(({ c, t }, i) => {
              const say = verdict(t);
              return (
                <li key={c.id}>
                  <Card
                    rise={4 + i}
                    title={c.name}
                    note={[
                      KIND_WORD[c.kind] ?? c.kind,
                      c.audience,
                      c.consentBasis ? (BASIS_WORD[c.consentBasis] ?? c.consentBasis) : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                    action={
                      <div className="flex shrink-0 items-center gap-2.5">
                        <Pill kind={c.status === "running" ? "warm" : "cold"}>
                          {c.status === "running"
                            ? "sending"
                            : c.status === "stopped"
                              ? "stopped"
                              : c.status === "finished"
                                ? "finished"
                                : "draft"}
                        </Pill>
                        <Link
                          href={`/lead-dashboard/campaigns/${encodeURIComponent(c.id)}${demo ? "?demo=1" : ""}`}
                          className="whitespace-nowrap rounded-lg border border-line px-2.5 py-1.5 text-[13px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        >
                          Everyone on it
                        </Link>
                      </div>
                    }
                  >
                    {say && (
                      <p className="mb-4 max-w-[70ch] font-sans text-[15.5px] font-semibold leading-snug tracking-[-.01em] text-ink">
                        {say}
                      </p>
                    )}

                    <Funnel totals={t} />

                    {/* Written down at the time rather than reconstructed
                        later, which is the only point at which the reason a
                        campaign was stopped is still known. */}
                    {c.note && (
                      <p className="mt-4 max-w-[70ch] border-l-2 border-line pl-3 text-[13.5px] leading-relaxed text-muted">
                        {c.note}
                      </p>
                    )}

                    <p className="mt-4 text-[12.5px] text-muted">
                      Started {when(c.startedAt)}
                      {c.finishedAt ? `, ended ${when(c.finishedAt)}` : ""}
                      {c.by ? `, by ${c.by}` : ""}. Route {c.route}.
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>

          {hidden > 0 && (
            <p className="mt-4 text-[12.5px] text-muted">
              {hidden} test {hidden === 1 ? "row" : "rows"} left out.
            </p>
          )}
        </>
      )}
    </Shell>
  );
}
