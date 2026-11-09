import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row } from "@/components/dashboard/DataTable";
import { Empty } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { IconCalendar, IconCheck, IconPhone } from "@/components/dashboard/icons";
import { getWidgetData, fmtDate } from "@/lib/dashboard/convex";
import { Card } from "@/components/dashboard/ui";
import { sourceLabel } from "@/lib/dashboard/channels";
import { isDemo, demoWidgetData } from "@/lib/dashboard/demo";
import { londonToday } from "@/lib/dashboard/day";

export const dynamic = "force-dynamic";

export default async function Bookings({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);
  const { bookings, leads, reachable, hidden } = demo
    ? demoWidgetData()
    : await getWidgetData();

  /* Which channel produced each booking. The diary and the channel report
     were answering different questions about the same appointment. */
  const sourceOf = (sessionId: string) =>
    leads.find((l) => l.sessionId === sessionId)?.sourceChannel ?? null;
  const sorted = [...bookings].sort((a, b) => b.at - a.at);

  const todayIso = londonToday();
  const upcoming = bookings.filter(
    (b) => b.status !== "cancelled" && b.preferredDate >= todayIso,
  ).length;
  const byVoice = bookings.filter((b) => b.channel === "voice").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

  /* The next seven days, day by day. A list sorted by date tells you what is
     booked; it does not tell you which day is full, which is the thing a
     person looks at a diary to find out. */
  const days: { iso: string; label: string; items: typeof bookings }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    days.push({
      iso,
      label: d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone: "Europe/London",
      }),
      items: bookings
        .filter((b) => b.preferredDate === iso && b.status !== "cancelled")
        .sort((a, b) => a.preferredTime.localeCompare(b.preferredTime)),
    });
  }
  const busiest = Math.max(...days.map((d) => d.items.length), 1);

  const rows: Row[] = sorted.map((b) => ({
    id: b._id,
    q: [b.reference, b.name, b.phone, b.service, b.notes, b.preferredDate].join(" ").toLowerCase(),
    sort: {
      ref: b.reference,
      date: b.preferredDate,
      who: b.name || "",
      status: b.status,
      booked: b.at,
    },
    cells: [
      { t: "text", v: b.reference, mono: true },
      {
        t: "text",
        v: b.preferredDate,
        sub: b.preferredTime,
        nowrap: true,
        strong: true,
      },
      { t: "text", v: b.name, sub: b.phone },
      { t: "text", v: b.service, sub: b.notes || undefined },
      /* Which channel produced this appointment. Without it the diary and
         the channel report describe the same booking and never agree. */
      { t: "text", v: sourceLabel(sourceOf(b.sessionId)) },
      { t: "pill", v: b.status },
      { t: "text", v: fmtDate(b.at), nowrap: true },
    ],
  }));

  return (
    <Shell
      active="/lead-dashboard/bookings"
      demo={demo}
      title="Appointments"
      lead="Booked by the assistant while the caller was still on the line, or while they were typing."
      counts={{ "/lead-dashboard/bookings": bookings.length }}
    >
      {!reachable ? (
        <Empty>The bookings store could not be reached just now.</Empty>
      ) : (
        <>
          <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi label="Booked in total" value={String(bookings.length)} icon={IconCalendar} accent />
            <Kpi label="Still to come" value={String(upcoming)} sub="from today onward" icon={IconCheck} />
            <Kpi
              label="Booked by phone"
              value={String(byVoice)}
              sub={`${bookings.length - byVoice} by chat`}
              icon={IconPhone}
            />
            <Kpi
              label="Cancelled"
              value={String(cancelled)}
              sub={bookings.length ? `${Math.round((cancelled / bookings.length) * 100)}% of bookings` : undefined}
              icon={IconCalendar}
              goodWhenUp={false}
            />
          </div>

          <Card title="The week ahead" note="Today and the next six days." className="mb-4" rise={4}>
            <ol className="grid gap-2 sm:grid-cols-7">
              {days.map((d, i) => (
                <li
                  key={d.iso}
                  className={[
                    "flex flex-col gap-2 rounded-xl border p-3",
                    i === 0 ? "border-[rgb(var(--accent-rgb)/.4)] bg-[rgb(var(--accent-rgb)/.08)]" : "border-line bg-warm/40",
                  ].join(" ")}
                >
                  <p className="text-[12.5px] font-semibold text-ink">
                    {i === 0 ? "Today" : d.label}
                  </p>
                  {/* How full the day is, said in a figure as well as a bar,
                      so it survives greyscale. */}
                  <p className="font-sans text-[20px] font-semibold leading-none tabular-nums text-ink">
                    {d.items.length || <span className="text-muted">0</span>}
                  </p>
                  <span className="h-1.5 overflow-hidden rounded-full bg-line/60">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${(d.items.length / busiest) * 100}%`,
                        background: "var(--accent)",
                      }}
                    />
                  </span>
                  <ul className="flex flex-col gap-1">
                    {d.items.slice(0, 3).map((b) => (
                      <li key={b._id} className="truncate text-[12px] text-muted">
                        <span className="tabular-nums text-ink">{b.preferredTime}</span>{" "}
                        {b.name}
                      </li>
                    ))}
                    {d.items.length > 3 && (
                      <li className="text-[12px] text-muted">and {d.items.length - 3} more</li>
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </Card>

          <DataTable
            columns={[
              { label: "Reference", key: "ref", width: "12%" },
              { label: "Appointment", key: "date", width: "14%" },
              { label: "Who", key: "who", width: "18%" },
              { label: "About" },
              { label: "Came from", key: "source" },
              { label: "Status", key: "status", width: "11%" },
              { label: "Booked", key: "booked", width: "14%" },
            ]}
            rows={rows}
            searchPlaceholder="Search reference, name, service"
            empty="Nothing booked yet."
            footnote={
              hidden > 0
                ? `${hidden} test ${hidden === 1 ? "row is" : "rows are"} not listed: bookings we made ourselves while building the assistant.`
                : undefined
            }
          />
        </>
      )}
    </Shell>
  );
}
