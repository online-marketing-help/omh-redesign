/* =========================================================================
   Our own test traffic, in one place.

   Every screen in this dashboard hides it, so the rule has to be identical
   everywhere: a figure that counts a session as real on one page and as a test
   on another is worse than either answer on its own. Three copies of this
   regex had already drifted apart, and `smoke-` was missing from all of them,
   which is why sixteen escalations written by scripts/smoke-test.mjs were
   being counted as questions from real people.

   Nothing is hidden silently. Each page states how many rows it left out.
   ========================================================================= */

const TEST_SESSION = new RegExp(
  "^(" +
    [
      "sdk-probe", // the SDK connection probe
      "voicetest",
      "voice-check",
      "voice-unknown$",
      "test",
      "smoke-", // scripts/smoke-test.mjs, on every run
      "probe",
      /* The industry demo checks: forty sessions of us asking a demo
         assistant whether it is a real company. Not the client's visitors. */
      "verify-",
      "demo-",
      "chat-sess-", // the metadata probe in the voice workflow
      "call_AAA", // hand-written call ids from the Retell wiring check
      "call_BBB",
    ].join("|") +
    ")",
  "i",
);

const TEST_NAME = /^(test|demo|example|asdf|qwerty)\b/i;
/* example.com and example.org are reserved by the IETF precisely so they can
   never be anyone's real address, which makes them a safe signal. */
const TEST_EMAIL = /@example\.(com|org|net)$|(^|[.\-_+])test@/i;

/**
 * True for a session id we created ourselves.
 *
 * The length check catches the one and two character ids typed by hand during
 * an audit (`r`, `t1`): a real id is either `web-<time>-<rand>` from the
 * widget or a Retell call id, and neither is ever that short.
 */
export function isTestSession(sessionId?: string | null): boolean {
  const s = (sessionId || "").trim();
  if (!s) return false;
  return TEST_SESSION.test(s) || s.length <= 3;
}

/** A recorded row: a lead, a booking or an escalation. */
export function isTestRow(r: { sessionId?: string; name?: string; email?: string }): boolean {
  return (
    isTestSession(r.sessionId) ||
    TEST_NAME.test((r.name || "").trim()) ||
    TEST_EMAIL.test((r.email || "").trim())
  );
}
