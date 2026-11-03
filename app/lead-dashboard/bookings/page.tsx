import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row } from "@/components/dashboard/DataTable";
import { Empty } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { IconCalendar, IconCheck, IconPhone } from "@/components/dashboard/icons";
import { getWidgetData, fmtDate } from "@/lib/dashboard/convex";
import { londonToday } from "@/lib/dashboard/day";

export const dynamic = "force-dynamic";

export default async function Bookings() {
  const { bookings, reachable, hidden } = await getWidgetData();
  const sorted = [...bookings].sort((a, b) => b.at - a.at);

  const todayIso = londonToday();
  const upcoming = bookings.filter(
    (b) => b.status !== "cancelled" && b.preferredDate >= todayIso,
  ).length;
  const byVoice = bookings.filter((b) => b.channel === "voice").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;

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
      { t: "pill", v: b.status },
      { t: "text", v: fmtDate(b.at), nowrap: true },
    ],
  }));

  return (
    <Shell
      active="/lead-dashboard/bookings"
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

          <DataTable
            columns={[
              { label: "Reference", key: "ref", width: "12%" },
              { label: "Appointment", key: "date", width: "14%" },
              { label: "Who", key: "who", width: "18%" },
              { label: "About" },
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
