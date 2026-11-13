import { Shell } from "@/components/dashboard/Shell";
import { Handover } from "@/components/dashboard/Handover";
import { Empty } from "@/components/dashboard/ui";
import { getInbox, canReply } from "@/lib/dashboard/handover";
import { dashboardLocked } from "@/lib/dashboard/auth";
import { isDemo, demoInboxQueue } from "@/lib/dashboard/demo";

export const dynamic = "force-dynamic";

export default async function HandoverPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);
  const inbox = demo ? demoInboxQueue() : await getInbox();

  return (
    <Shell
      active="/lead-dashboard/handover"
      title="Needs a person"
      lead="Conversations the assistant handed over. Your reply appears in the chat on the site."
      counts={{ "/lead-dashboard/handover": inbox.waiting }}
      urgent={["/lead-dashboard/handover"]}
      demo={demo}
    >
      {!inbox.reachable ? (
        <Empty>
          The conversation store did not answer, so this queue is not current.
          Either the handover routes are not deployed to the assistant&rsquo;s
          Convex deployment yet, or OHM_WIDGET_SECRET is not set on this
          server. Nothing is lost while it is down: the assistant still records
          every question it could not answer.
        </Empty>
      ) : (
        <>
          <Handover
            rows={inbox.rows}
            /* Never writable on the example data: a reply typed here goes
               into a real conversation with a real member of the public. */
            canReply={!demo && canReply && dashboardLocked}
            lockedReason={
              demo
                ? "Example data. Replying is switched off here."
                : !canReply
                ? "Read only: OHM_WIDGET_SECRET is not set on the server."
                : !dashboardLocked
                  ? "Read only: set OMH_DASHBOARD_USER and OMH_DASHBOARD_PASSWORD to reply."
                  : undefined
            }
          />

          <div className="mt-5 space-y-2">
            {inbox.orphanQuestions > 0 && (
              <p className="max-w-[78ch] text-[13px] leading-relaxed text-muted">
                {inbox.orphanQuestions} escalated{" "}
                {inbox.orphanQuestions === 1 ? "question has" : "questions have"} no
                conversation behind{" "}
                {inbox.orphanQuestions === 1 ? "it" : "them"}: a call escalated
                before any chat existed, so there is nobody still on the page to
                reply to. They are in the call records.
              </p>
            )}
            {typeof inbox.hidden === "number" && inbox.hidden > 0 && (
              <p className="max-w-[78ch] text-[13px] leading-relaxed text-muted">
                {inbox.hidden} test {inbox.hidden === 1 ? "conversation is" : "conversations are"}{" "}
                not listed: ones we created ourselves while building the
                assistant.
              </p>
            )}
          </div>
        </>
      )}
    </Shell>
  );
}
