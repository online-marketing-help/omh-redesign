"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================================
   OMH site assistant. Chat and voice as two tabs in one panel.

   Drops into the existing Next.js site. Colours read the site's own Tailwind
   v4 tokens (--color-ink, --color-amber, --color-warm and friends) with hard
   fallbacks, so it inherits the brand and both themes without importing
   anything from the design system.

   The Retell SDK loads only when someone opens the Voice tab, so nobody pays
   the bundle cost for a feature they never touch.
   ========================================================================= */

const CHAT_URL = process.env.NEXT_PUBLIC_OHM_CHAT_URL ?? "";
const VOICE_TOKEN_URL = process.env.NEXT_PUBLIC_OHM_VOICE_TOKEN_URL ?? "";
/* The ESM build, not the UMD one. retell-client-js-sdk's UMD file leaves
   eventemitter3 and livekit-client as externals, so loading it from a CDN in a
   script tag throws "Cannot read properties of undefined (reading
   'EventEmitter')" the moment a call starts. jsDelivr's +esm build rewrites
   those imports to further +esm URLs, so the browser fetches the whole tree.
   Verified against a live call in Chromium and WebKit. */
const RETELL_SDK = "https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.0.5/+esm";

const PHONE = "020 3489 3934";
const EMAIL = "support@onlinemarketinghelp.co.uk";

type Msg = { role: "user" | "assistant"; text: string };
type Voice = "idle" | "connecting" | "live" | "error";
type Tab = "chat" | "voice";

const OPENER =
  "Hello. I can answer from Online Marketing Help's own information: services, " +
  "what each one includes, packages and prices. I can also book you a free " +
  "30 minute consultation.";

const CHIPS = [
  "What do you do?",
  "How much is SEO?",
  "Build a Shopify store?",
  "Book a consultation",
];

function sessionId() {
  try {
    const found = sessionStorage.getItem("ohm_assistant_session");
    if (found) return found;
  } catch {
    /* private window or blocked storage: fall through to a fresh id */
  }
  const id = "web-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  try {
    sessionStorage.setItem("ohm_assistant_session", id);
  } catch {
    /* not fatal, the id just will not survive a reload */
  }
  return id;
}

export default function OhmAssistant() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: OPENER }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [voice, setVoice] = useState<Voice>("idle");
  const [voiceNote, setVoiceNote] = useState("");
  const [secs, setSecs] = useState(0);

  const sess = useRef("");
  const threadRef = useRef<HTMLDivElement>(null);
  const retellRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sess.current = sessionId();
  }, []);

  useEffect(() => {
    const t = threadRef.current;
    if (t) t.scrollTop = t.scrollHeight;
  }, [msgs, sending, tab]);

  useEffect(() => {
    if (open && tab === "chat") inputRef.current?.focus();
  }, [open, tab]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Call timer, so a caller can see the line is genuinely open. */
  useEffect(() => {
    if (voice !== "live") {
      setSecs(0);
      return;
    }
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [voice]);

  /* ---------------------------------------------------------------- chat */

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || sending) return;
      setInput("");
      setMsgs((m) => [...m, { role: "user", text: clean }]);
      setSending(true);
      try {
        const r = await fetch(CHAT_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            session_id: sess.current,
            message: clean,
            page_url: typeof window !== "undefined" ? window.location.href : "",
          }),
        });
        if (!r.ok) throw new Error(String(r.status));
        const data = await r.json();
        setMsgs((m) => [
          ...m,
          { role: "assistant", text: data.reply || "Sorry, could you put that another way?" },
        ]);
      } catch {
        /* Never leave someone staring at a dead box. Give them a way through. */
        setMsgs((m) => [
          ...m,
          {
            role: "assistant",
            text: `Sorry, I cannot reach our system right now. Please call ${PHONE} or email ${EMAIL} and the team will pick it up.`,
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [sending],
  );

  /* ---------------------------------------------------------------- voice */

  const loadSdk = useCallback(async () => {
    /* Held in a variable so the bundler cannot resolve it at build time and
       pull LiveKit into the main chunk: nobody who never opens the Voice tab
       should pay for it. */
    const url = RETELL_SDK;
    const mod: any = await import(/* webpackIgnore: true */ url);
    return mod?.RetellWebClient ?? mod?.default?.RetellWebClient;
  }, []);

  const startVoice = useCallback(async () => {
    if (voice === "live" || voice === "connecting") return;
    setVoice("connecting");
    setVoiceNote("Connecting…");
    try {
      const Client = await loadSdk();
      if (!Client) throw new Error("sdk");

      const r = await fetch(VOICE_TOKEN_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          session_id: sess.current,
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!r.ok) throw new Error("token");
      const { access_token } = await r.json();
      if (!access_token) throw new Error("token");

      const client = new Client();
      retellRef.current = client;
      client.on("call_started", () => {
        setVoice("live");
        setVoiceNote("");
      });
      client.on("call_ended", () => {
        setVoice("idle");
        setVoiceNote("Call ended.");
      });
      client.on("error", () => {
        setVoice("error");
        setVoiceNote(`The call dropped. Please try again or ring ${PHONE}.`);
        try {
          client.stopCall();
        } catch {
          /* already gone */
        }
      });
      /* Mirror the call into the same thread, so chat and voice stay one
         conversation and the caller can read back what they agreed. */
      client.on("update", (u: any) => {
        const last = u?.transcript?.[u.transcript.length - 1];
        if (!last?.content) return;
        const role: Msg["role"] = last.role === "agent" ? "assistant" : "user";
        setMsgs((m) => {
          const prev = m[m.length - 1];
          if (prev && prev.role === role && last.content.startsWith(prev.text)) {
            return [...m.slice(0, -1), { role, text: last.content }];
          }
          if (prev && prev.role === role && prev.text === last.content) return m;
          return [...m, { role, text: last.content }];
        });
      });

      await client.startCall({ accessToken: access_token });
    } catch (e: any) {
      setVoice("error");
      setVoiceNote(
        e?.message === "token"
          ? `Could not start the call. Please ring ${PHONE}.`
          : `Your browser blocked the microphone, or the call could not start. Please ring ${PHONE}.`,
      );
    }
  }, [voice, loadSdk]);

  const stopVoice = useCallback(() => {
    try {
      retellRef.current?.stopCall();
    } catch {
      /* already stopped */
    }
    setVoice("idle");
  }, []);

  useEffect(
    () => () => {
      try {
        retellRef.current?.stopCall();
      } catch {
        /* unmounting anyway */
      }
    },
    [],
  );

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  /* ---------------------------------------------------------------- view */

  return (
    <>
      <style>{CSS}</style>

      {!open && (
        <button className="ohm-fab" onClick={() => setOpen(true)} aria-label="Open the assistant">
          <Headset />
          <span>Ask the assistant</span>
        </button>
      )}

      {open && (
        <section className="ohm-panel" role="dialog" aria-label="Online Marketing Help assistant">
          <header className="ohm-head">
            <span className="ohm-ico" aria-hidden="true">
              <Headset />
            </span>
            <span className="ohm-who">
              <strong>OMH Assistant</strong>
              <em>
                <i className="ohm-live-dot" aria-hidden="true" />
                Assistant. Answers from our own information
              </em>
            </span>
            <button
              className="ohm-x"
              onClick={() => {
                stopVoice();
                setOpen(false);
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </header>

          <div className="ohm-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === "chat"}
              className={tab === "chat" ? "on" : ""}
              onClick={() => setTab("chat")}
            >
              <ChatIcon /> Chat
            </button>
            <button
              role="tab"
              aria-selected={tab === "voice"}
              className={tab === "voice" ? "on" : ""}
              onClick={() => setTab("voice")}
            >
              <MicIcon /> Voice
            </button>
          </div>

          {tab === "chat" ? (
            <>
              <div className="ohm-thread" ref={threadRef} aria-live="polite">
                {msgs.map((m, i) => (
                  <div key={i} className={`ohm-bub ohm-${m.role}`}>
                    {m.text}
                  </div>
                ))}
                {sending && (
                  <div className="ohm-bub ohm-assistant ohm-typing" aria-label="typing">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>

              <div className="ohm-chips">
                {CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)} disabled={sending}>
                    {c}
                  </button>
                ))}
              </div>

              <form
                className="ohm-compose"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                  aria-label="Your message"
                />
                <button type="submit" aria-label="Send" disabled={sending || !input.trim()}>
                  <SendIcon />
                </button>
              </form>
            </>
          ) : (
            <div className="ohm-voice">
              <div className={`ohm-orb ohm-orb-${voice}`} aria-hidden="true">
                <Headset />
              </div>

              <h3>
                {voice === "live"
                  ? "You are on a call"
                  : voice === "connecting"
                    ? "Connecting…"
                    : "Talk to the assistant"}
              </h3>
              <p>
                {voice === "live"
                  ? `Speak normally. You can interrupt at any time. ${mmss}`
                  : "It answers in English, from our own information, and can book your consultation. Your browser will ask for the microphone."}
              </p>

              {voiceNote && (
                <p className={`ohm-vnote${voice === "error" ? " bad" : ""}`}>{voiceNote}</p>
              )}

              <button
                className={`ohm-call${voice === "live" ? " end" : ""}`}
                onClick={voice === "live" ? stopVoice : startVoice}
                disabled={voice === "connecting"}
              >
                {voice === "live" ? "End call" : voice === "connecting" ? "Connecting…" : "Start call"}
              </button>

              <p className="ohm-vfoot">
                Prefer a person? Call <a href="tel:+442034893934">{PHONE}</a>
              </p>
            </div>
          )}

          <footer className="ohm-foot">
            Assistant by <strong>Online Marketing Help</strong>
          </footer>
        </section>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- icons */

const Headset = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M20 14h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
  </svg>
);
const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
       strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
  </svg>
);

/* Scoped to .ohm-*. Every colour reads the site's own token first. */
const CSS = `
.ohm-fab{position:fixed;right:20px;bottom:20px;z-index:9998;display:inline-flex;
  align-items:center;gap:9px;padding:13px 20px;border:none;border-radius:999px;cursor:pointer;
  background:var(--color-ink,#101828);color:var(--color-oninverse,#fff);
  font:600 15px/1 var(--font-body,"Source Sans 3",system-ui,sans-serif);
  box-shadow:0 10px 30px -10px rgba(16,24,40,.45)}
.ohm-fab:hover{transform:translateY(-1px)}

.ohm-panel{position:fixed;right:20px;bottom:20px;z-index:9999;
  width:min(408px,calc(100vw - 32px));height:min(660px,calc(100vh - 40px));
  display:flex;flex-direction:column;overflow:hidden;
  background:var(--color-surface,#fff);color:var(--color-ink,#101828);
  border:1px solid var(--color-line,#d9ddd8);border-radius:var(--radius-card,14px);
  box-shadow:0 24px 64px -18px rgba(16,24,40,.38);
  font:400 15px/1.55 var(--font-body,"Source Sans 3",system-ui,sans-serif)}

.ohm-head{display:flex;align-items:center;gap:12px;padding:15px 16px}
.ohm-ico{width:40px;height:40px;flex:0 0 auto;border-radius:12px;display:grid;place-items:center;
  background:var(--color-amber,#d79a37);color:#fff}
.ohm-who{display:flex;flex-direction:column;gap:3px;min-width:0}
.ohm-who strong{font:600 16px/1.1 var(--font-display,"Instrument Sans",system-ui,sans-serif)}
.ohm-who em{font-style:normal;font-size:12px;color:var(--color-muted,#667085);
  display:flex;align-items:center;gap:6px}
.ohm-live-dot{width:7px;height:7px;border-radius:50%;background:var(--color-success,#067647);
  flex:0 0 auto;animation:ohmp 2.4s ease-in-out infinite}
@keyframes ohmp{0%,100%{opacity:1}50%{opacity:.4}}
.ohm-x{margin-left:auto;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;
  color:var(--color-muted,#667085);padding:7px}
.ohm-x:hover{color:var(--color-ink,#101828)}

.ohm-tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--color-line,#d9ddd8)}
.ohm-tabs button{display:inline-flex;align-items:center;justify-content:center;gap:7px;
  padding:12px 8px;background:none;border:none;cursor:pointer;
  border-bottom:2px solid transparent;margin-bottom:-1px;
  color:var(--color-muted,#667085);
  font:600 14.5px/1 var(--font-body,"Source Sans 3",system-ui,sans-serif)}
.ohm-tabs button:hover{color:var(--color-ink,#101828)}
.ohm-tabs button.on{color:var(--color-ink,#101828);border-bottom-color:var(--color-amber,#d79a37)}

.ohm-thread{flex:1;min-height:0;overflow-y:auto;padding:18px 16px;
  display:flex;flex-direction:column;gap:10px}
.ohm-bub{max-width:88%;padding:12px 15px;border-radius:14px;font-size:14.5px;
  white-space:pre-wrap;word-wrap:break-word;
  animation:ohmin .22s cubic-bezier(.2,.7,.3,1) both}
@keyframes ohmin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.ohm-assistant{align-self:flex-start;background:var(--color-warm,#f7f6f2);
  border:1px solid var(--color-line,#d9ddd8);border-bottom-left-radius:5px}
.ohm-user{align-self:flex-end;background:var(--color-ink,#101828);
  color:var(--color-oninverse,#fff);border-bottom-right-radius:5px}
.ohm-typing{display:inline-flex;gap:4px;align-items:center;padding:14px}
.ohm-typing i{width:6px;height:6px;border-radius:50%;background:var(--color-muted,#667085);
  animation:ohmd 1.2s infinite ease-in-out}
.ohm-typing i:nth-child(2){animation-delay:.15s}
.ohm-typing i:nth-child(3){animation-delay:.3s}
@keyframes ohmd{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}

.ohm-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 12px}
.ohm-chips button{padding:9px 15px;border-radius:999px;cursor:pointer;font-size:13.5px;
  background:var(--color-surface,#fff);color:var(--color-ink,#101828);
  border:1px solid var(--color-line,#d9ddd8);font-family:inherit}
.ohm-chips button:hover:not(:disabled){border-color:var(--color-amber,#d79a37);
  color:var(--color-amber-deep,#8f5a0e)}
.ohm-chips button:disabled{opacity:.5;cursor:not-allowed}

.ohm-compose{display:flex;gap:9px;align-items:center;padding:0 16px 14px}
.ohm-compose input{flex:1;min-width:0;padding:13px 17px;border-radius:999px;font:inherit;font-size:14.5px;
  border:1px solid var(--color-line,#d9ddd8);background:var(--color-surface,#fff);
  color:var(--color-ink,#101828)}
.ohm-compose input:focus{outline:none;border-color:var(--color-amber,#d79a37)}
.ohm-compose button{width:46px;height:46px;flex:0 0 auto;border-radius:50%;border:none;cursor:pointer;
  display:grid;place-items:center;
  background:var(--color-amber,#d79a37);color:#fff}
.ohm-compose button:hover:not(:disabled){background:var(--color-amber-deep,#8f5a0e)}
.ohm-compose button:disabled{opacity:.4;cursor:not-allowed}

.ohm-voice{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:24px 26px;gap:3px}
.ohm-orb{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;
  background:var(--color-warm,#f7f6f2);border:1px solid var(--color-line,#d9ddd8);
  color:var(--color-amber,#d79a37);margin-bottom:18px}
.ohm-orb svg{width:34px;height:34px}
.ohm-orb-live{background:var(--color-amber,#d79a37);color:#fff;border-color:transparent;
  animation:ohmring 1.8s ease-out infinite}
.ohm-orb-connecting{animation:ohmp 1.2s ease-in-out infinite}
@keyframes ohmring{0%{box-shadow:0 0 0 0 rgba(215,154,55,.5)}
  100%{box-shadow:0 0 0 22px rgba(215,154,55,0)}}
.ohm-voice h3{margin:0 0 7px;font:600 18px/1.2 var(--font-display,"Instrument Sans",system-ui,sans-serif)}
.ohm-voice p{margin:0;font-size:14px;color:var(--color-muted,#667085);max-width:34ch}
.ohm-vnote{margin-top:10px!important;font-size:13px!important}
.ohm-vnote.bad{color:var(--color-error,#b42318)!important}
.ohm-call{margin-top:22px;padding:14px 34px;border-radius:999px;border:none;cursor:pointer;
  background:var(--color-ink,#101828);color:var(--color-oninverse,#fff);
  font:600 15px/1 var(--font-body,"Source Sans 3",system-ui,sans-serif)}
.ohm-call.end{background:var(--color-error,#b42318)}
.ohm-call:disabled{opacity:.5;cursor:not-allowed}
.ohm-vfoot{margin-top:18px!important;font-size:13px!important}
.ohm-vfoot a{color:var(--color-amber-deep,#8f5a0e)}

.ohm-foot{padding:11px 16px;text-align:center;font-size:12px;
  color:var(--color-muted,#667085);border-top:1px solid var(--color-line,#d9ddd8);
  background:var(--color-warm,#f7f6f2)}
.ohm-foot strong{color:var(--color-ink,#101828);font-weight:600}

@media (max-width:460px){
  .ohm-panel{right:8px;left:8px;bottom:8px;width:auto;height:min(82vh,660px)}
  .ohm-fab{right:12px;bottom:12px}
}
@media (prefers-reduced-motion:reduce){
  .ohm-bub,.ohm-live-dot,.ohm-typing i,.ohm-orb-live,.ohm-orb-connecting{animation:none}
}
`;
