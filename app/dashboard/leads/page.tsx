import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row } from "@/components/dashboard/DataTable";
import { Card, Empty } from "@/components/dashboard/ui";
import { Kpi, Mix } from "@/components/dashboard/Stats";
import { IconLead, IconChat, IconPhone } from "@/components/dashboard/icons";
import { getWidgetData, temperature, fmtDate } from "@/lib/dashboard/convex";

export const dynamic = "force-dynamic";

export default async function Leads() {
  const { leads, reachable, hidden } = await getWidgetData();
  const sorted = [...leads].sort((a, b) => b.at - a.at);

  const hot = leads.filter((l) => temperature(l) === "hot").length;
  const warm = leads.filter((l) => temperature(l) === "warm").length;
  const cold = leads.length - hot - warm;
  const byVoice = leads.filter((l) => l.channel === "voice").length;
  const contactable = leads.filter((l) => l.phone || l.email).length;

  const rows: Row[] = sorted.map((l) => ({
    id: l._id,
    q: [l.name, l.company, l.phone, l.email, l.service, l.budget, l.message]
      .join(" ")
      .toLowerCase(),
    sort: {
      who: l.name || "",
      temp: temperature(l) === "hot" ? 0 : temperature(l) === "warm" ? 1 : 2,
      channel: l.channel,
      when: l.at,
    },
    cells: [
      /* The name opens the conversation behind the lead. A row tells you what
         they wanted; only the transcript tells you how they got there, which
         is what anybody ringing them back actually needs. */
      {
        t: "link",
        v: l.name || "No name given",
        href: `/dashboard/conversations/${encodeURIComponent(l.sessionId)}`,
        sub: l.company || undefined,
      },
      {
        t: "text",
        v: l.phone || l.email || "nothing left",
        sub: l.phone && l.email ? l.email : undefined,
      },
      { t: "text", v: l.service || "not said", sub: l.budget || undefined },
      { t: "pill", v: temperature(l) },
      { t: "pill", v: l.channel },
      { t: "text", v: fmtDate(l.at), nowrap: true },
    ],
  }));

  return (
    <Shell
      active="/dashboard/leads"
      title="Leads"
      lead="Everyone the assistant captured, by chat or by phone, with how warm they were when they left."
      counts={{ "/dashboard/leads": leads.length }}
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
                label="Reachable"
                value={String(contactable)}
                sub="left a phone or an email"
                icon={IconPhone}
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
              { label: "Who", key: "who", width: "20%" },
              { label: "Contact", width: "20%" },
              { label: "What they wanted" },
              { label: "Temperature", key: "temp", width: "12%" },
              { label: "Channel", key: "channel", width: "10%" },
              { label: "When", key: "when", width: "14%" },
            ]}
            rows={rows}
            searchPlaceholder="Search name, company, service"
            empty="No leads captured yet."
            footnote={
              <>
                Click a name to read the whole conversation behind it: the chat
                if they typed, the recording and summary if they called.
                {" "}
                Hot is set by the assistant during the conversation. Warm means
                they left a way to reach them and said what they were after.
                {hidden > 0 && ` ${hidden} test ${hidden === 1 ? "row is" : "rows are"} not listed.`}
              </>
            }
          />
        </>
      )}
    </Shell>
  );
}
