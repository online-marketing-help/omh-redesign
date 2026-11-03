import { Shell } from "@/components/dashboard/Shell";
import { Handover } from "@/components/dashboard/Handover";
import { Empty } from "@/components/dashboard/ui";
import { getInbox, canReply } from "@/lib/dashboard/handover";
import { dashboardLocked } from "@/lib/dashboard/auth";

export const dynamic = "force-dynamic";

export default async function HandoverPage() {
  const inbox = await getInbox();

  return (
    <Shell
      active="/dashboard/handover"
      title="Needs a person"
      lead="Conversations the assistant handed over, either because the answer was not in Online Marketing Help's own information or because the visitor asked for a person. Answer them here and your words appear in the chat on the site."
      counts={{ "/dashboard/handover": inbox.waiting }}
      urgent={["/dashboard/handover"]}
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
            canReply={canReply && dashboardLocked}
            lockedReason={
              !canReply
                ? "Replying needs OHM_WIDGET_SECRET set on the server. Without it this screen can read the queue but not answer it."
                : !dashboardLocked
                  ? "Replying is switched off because the dashboard has no password. Anyone who found this URL could otherwise write to a visitor as Online Marketing Help. Set OMH_DASHBOARD_USER and OMH_DASHBOARD_PASSWORD to turn it on."
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
