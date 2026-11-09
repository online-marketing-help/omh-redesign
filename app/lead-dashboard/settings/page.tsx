import { Shell } from "@/components/dashboard/Shell";
import { Card } from "@/components/dashboard/ui";
import { KillSwitch } from "@/components/dashboard/KillSwitch";
import { getOutbound, canWrite } from "@/lib/dashboard/routing";
import { dashboardUser, dashboardLocked } from "@/lib/dashboard/auth";
import { ROUTE_SUMMARY } from "@/lib/dashboard/route-summary";
import { isDemo } from "@/lib/dashboard/demo";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);
  /* On the example data the switch is shown in its normal, running state and
     is not wired to anything. It is the one control on the dashboard whose
     real version stops every message going out, so a demonstration of it must
     not be able to reach the real one. */
  const outbound = demo
    ? { enabled: true, updatedAt: null, updatedBy: "owner" }
    : await getOutbound();
  /* Unreachable is not the same as off, and showing "running" when we simply
     cannot tell would be the worst of the three. */
  const reachable = outbound !== null;
  const enabled = outbound?.enabled ?? false;

  return (
    <Shell
      active="/lead-dashboard/settings"
      title="Settings"
      lead="How the assistant contacts people, and the switch that stops it."
      demo={demo}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card
          title="Automated messages"
          note="Every text, email and callback."
          rise={0}
        >
          {reachable ? (
            <KillSwitch
              enabled={enabled}
              updatedBy={outbound?.updatedBy ?? null}
              canWrite={!demo && canWrite && dashboardLocked}
            />
          ) : (
            <p className="rounded-xl bg-warm px-4 py-3 text-[13.5px] leading-relaxed text-muted">
              The routing store cannot be reached from here, so the switch is
              not shown rather than shown in a state that might be wrong. If
              messages need to stop now, deactivate{" "}
              <strong className="font-semibold text-ink">
                OHM Assistant, Sequence Worker
              </strong>{" "}
              in n8n.
            </p>
          )}
        </Card>

        <Card title="Who is signed in" rise={1}>
          <dl className="grid gap-3 text-[13.5px]">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">User</dt>
              <dd className="font-medium text-ink">{dashboardUser}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Password set</dt>
              <dd className="font-medium text-ink">{dashboardLocked ? "Yes" : "No"}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Can send</dt>
              <dd className="font-medium text-ink">{canWrite ? "Yes" : "No"}</dd>
            </div>
          </dl>

        </Card>
      </div>

      <Card
        title="What happens to a lead, by channel"
        note="Fixed in the code, not edited here."
        className="mt-5"
        rise={2}
      >
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ROUTE_SUMMARY.map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-line bg-warm/60 p-4"
            >
              <p className="font-sans text-[13px] font-semibold tracking-wide text-[var(--dash-accent-text)]">
                {r.id}. {r.name}
              </p>
              <p className="mt-1.5 text-[13px] font-medium leading-snug text-ink">
                {r.rule}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                {r.steps}
              </p>
              {r.note ? (
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  <strong className="font-semibold text-ink">Note. </strong>
                  {r.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12.5px] text-muted">
          Automated calls exist on routes B and E only.
        </p>
      </Card>
    </Shell>
  );
}
