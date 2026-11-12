/* =========================================================================
   OMH site assistant, as a drop-in embed.

   onlinemarketinghelp.co.uk is WordPress, so this cannot be the React
   component: it has to survive a theme it knows nothing about, and it has to
   install with one script tag and no build step.

   Two decisions follow from that.

   1. Vanilla DOM, not React. The host page may already ship its own React,
      and a second copy is both weight and a source of version conflicts.

   2. Shadow DOM. WordPress themes set global rules on button, input and * that
      would wreck this panel, and this panel's own rules would leak back into
      the theme. A shadow root stops both directions. CSS custom properties
      still inherit across the boundary, so the var(--color-ink, #101828)
      pattern keeps working: on the Next.js site it picks up the real brand
      tokens, on WordPress it falls back to the literals below.

   Install:
     <script src="/path/to/ohm-assistant.js" defer></script>

   Override the endpoints without editing this file:
     <script src="…/ohm-assistant.js" defer
             data-chat-url="https://…/webhook/ohm-chat"
             data-voice-token-url="https://…/webhook/ohm-voice-token"
             data-position="left"></script>
   ========================================================================= */

/* The same file the tests assert and the n8n Code node runs, bundled in here
   by build.mjs rather than copied. What a photo is allowed to be has to be
   one answer in one place: the copy in the browser being a little out of
   date from the copy on the server is precisely how something gets accepted
   on one side and refused on the other. */
import { checkAttachment, LIMITS } from "../../../gates/attachments.js";

(function () {
  "use strict";

  /* A WordPress site can easily end up including the same script twice, from a
     theme and from a plugin. Two panels fighting over one session id is worse
     than no panel, so the second copy does nothing. */
  if (window.__ohmAssistantLoaded) return;
  window.__ohmAssistantLoaded = true;

  /* ------------------------------------------------------------- config */

  var N8N = "https://n8n.srv1836598.hstgr.cloud";
  var el = document.currentScript;
  var data = (el && el.dataset) || {};

  var CHAT_URL = data.chatUrl || N8N + "/webhook/ohm-chat";
  var VOICE_TOKEN_URL = data.voiceTokenUrl || N8N + "/webhook/ohm-voice-token";
  /* Handover. These two go straight to Convex rather than through n8n, which
     is the one exception to "the browser never talks to Convex": polling every
     few seconds through a workflow engine would spend an execution per visitor
     per tick for a reply that usually is not there. Both routes are scoped to
     this visitor's own session id and carry no secret, which is why they can be
     called from here at all. See convex/http.ts. */
  var CONVEX_SITE = data.convexSite || "https://cool-ferret-103.convex.site";
  var POLL_URL = CONVEX_SITE + "/visitorPoll";
  var SAY_URL = CONVEX_SITE + "/visitorSay";
  var HELLO_URL = CONVEX_SITE + "/visitorHello";
  var UPLOAD_URL = CONVEX_SITE + "/visitor/attachment/url";
  var ATTACH_URL = CONVEX_SITE + "/visitor/attachment/attach";
  var HISTORY_URL = CONVEX_SITE + "/visitor/history";
  var SIDE = data.position === "left" ? "left" : "right";
  /* The ESM build, not the UMD one. retell-client-js-sdk's UMD file leaves
     eventemitter3 and livekit-client as externals, so loading it from a CDN in
     a plain script tag throws "Cannot read properties of undefined (reading
     'EventEmitter')" the moment a call starts. jsDelivr's +esm build rewrites
     those imports to further +esm URLs, so the browser fetches the whole tree
     itself. It is pulled in on demand, so a visitor who never opens the Voice
     tab never downloads it. */
  var RETELL_SDK =
    data.retellSdk || "https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.0.5/+esm";

  var PHONE = "020 3489 3934";
  var TEL = "+442034893934";
  var EMAIL = "support@onlinemarketinghelp.co.uk";

  var OPENER =
    "Hello. I can answer from Online Marketing Help's own information: services, " +
    "what each one includes, packages and prices. I can also book you a free " +
    "30 minute consultation.";

  /* What somebody who has been here before sees instead. It REPLACES the
     opener rather than sitting above it: two greetings in a row is not a
     warmer welcome, it is a wall of text before they have said anything,
     and the list of what the assistant can do is the part a returning
     visitor has already read.

     Still not "Welcome back, Monzur". Being named by a website you did not
     log into unsettles people. The assistant knows who they are and will
     not ask again for details it already holds; it does not need to prove
     that in the first sentence. */
  var OPENER_BACK =
    "Welcome back. I still have your details, so we can pick up where we " +
    "left off. What can I help you with?";

  var CHIPS = [
    "What do you do?",
    "How much is SEO?",
    "Build a Shopify store?",
    "Book a consultation",
  ];

  /* ------------------------------------------------------------- state */

  var state = {
    open: false,
    tab: "chat",
    msgs: [{ role: "assistant", text: OPENER }],
    sending: false,
    /* Kept apart from `sending`: a file going up does not stop someone
       typing the next sentence, it only stops them starting a second
       upload. */
    uploading: false,
    voice: "idle", // idle | connecting | live | error
    note: "",
    secs: 0,
    /* none | waiting | live | closed. While it is waiting or live the
       assistant has stepped back and a person is answering, so this panel
       stops asking the model anything and listens instead. */
    handover: "none",
    /* The newest message this panel has already shown, so a poll asks for what
       is new rather than for the conversation again. Starts at load time: the
       panel already has everything said before that, and re-fetching it would
       print the whole thread twice. */
    seenAt: Date.now(),
    /* Replies that arrived while the panel was shut, shown on the pill. */
    unread: 0,
  };

  var retell = null;
  var timer = null;

  /* True when this page load picked up a conversation already in progress.
     It decides whether to start listening straight away: if the visitor
     reloaded while a person was answering them, nothing has been typed yet on
     this page, so waiting for a first message would send that message to the
     assistant and have it answer over the top of the person.

     Declared above the call below on purpose. It was underneath, and `var`
     initialisers run in source order, so sessionId() set it to true and the
     line after it set it straight back to false. */
  var resumed = false;
  var sess = sessionId();
  var visitor = visitorId();

  /* The person, as opposed to the visit.

     sessionStorage is wiped when the tab closes, so it can only ever say
     "this visit". localStorage survives closing the tab, closing the browser
     and rebooting, so the same machine next week is the same person. That is
     what stops someone who chatted on Monday becoming a second lead on
     Friday, and it needs no phone number, which matters because most people
     who use a chat widget never give one.

     If storage is blocked, a private window or a locked-down browser, we fall
     back to the visit id. Then they are simply a new person each time, which
     is the old behaviour rather than a broken one. */
  function visitorId() {
    try {
      var found = localStorage.getItem("ohm_visitor");
      if (found) return found;
      var made = "p-" + token(16);
      localStorage.setItem("ohm_visitor", made);
      return made;
    } catch (e) {
      return sess;
    }
  }

  /* What advert sent them, captured once and kept.

     Stored beside the visitor id rather than in the visit, because the whole
     point is that it survives: somebody who clicks a Google ad on Monday,
     reads two pages, then comes back on Friday and starts a chat is still a
     Google ad lead. A per-visit capture would credit Friday's direct visit
     and the ad spend would look like it produced nothing.

     Written once and never updated. The second page of a visit carries no
     gclid, so an overwrite would erase the thing we came for. */
  function attribution() {
    var KEY = "ohm_attribution";
    try {
      var saved = localStorage.getItem(KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      /* Blocked or corrupt. Fall through and read the URL instead: worse than
         a stored first touch, better than nothing. */
    }

    var q = {};
    try {
      var sp = new URLSearchParams(location.search);
      sp.forEach(function (v, k) { q[k.toLowerCase()] = v; });
    } catch (e) { q = {}; }

    var ref = "";
    try {
      /* Our own pages are not a referrer worth recording. */
      ref = document.referrer || "";
      if (ref && ref.indexOf(location.hostname) !== -1) ref = "";
    } catch (e) { ref = ""; }

    var a = {};
    function put(key, value) {
      if (value && String(value).trim()) a[key] = String(value).trim().slice(0, 500);
    }
    /* gclid and fbclid are minted by the ad platform. A utm_ can be typed by
       anyone, so these two are the ones that actually prove the advert. */
    put("gclid", q.gclid);
    put("fbclid", q.fbclid);
    put("source", q.utm_source);
    put("medium", q.utm_medium);
    put("campaign", q.utm_campaign);
    put("keyword", q.utm_term);
    put("adGroup", q.utm_content);
    put("campaignId", q.campaignid || q.campaign_id);
    put("adId", q.adid || q.ad_id || q.creative);
    put("landingPage", location.href);
    put("referrer", ref);

    /* Nothing identifying at all: no advert, no referrer. Do not store an
       empty object, so a later visit that DOES carry one can still be the
       first touch. */
    if (!a.gclid && !a.fbclid && !a.source && !a.referrer) return null;

    try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
    return a;
  }

  /* Random that is actually random.

     Both ids below are bearer tokens: presenting one is how the server
     knows which conversation is yours, and the history route hands back a
     transcript to whoever holds the pair. They were built from
     `Date.now()` and `Math.random()`, which is a known prefix plus about
     forty bits from a generator that is not meant for this and is
     predictable from a few samples. `crypto.getRandomValues` is in every
     browser this widget supports.

     The fallback is kept for the browser that somehow has no crypto:
     weaker, but it must not be a crash. */
  function token(bytes) {
    var out = "";
    try {
      var a = new Uint8Array(bytes);
      (window.crypto || window.msCrypto).getRandomValues(a);
      for (var i = 0; i < a.length; i++) out += (a[i] + 256).toString(16).slice(1);
      return out;
    } catch (e) {
      for (var j = 0; j < bytes * 2; j++) out += Math.floor(Math.random() * 16).toString(16);
      return out;
    }
  }

  function sessionId() {
    try {
      var found = sessionStorage.getItem("ohm_assistant_session");
      if (found) { resumed = true; return found; }
    } catch (e) {
      /* private window, or the host blocks storage: fall through to a fresh id */
    }
    var id = "web-" + token(16);
    try {
      sessionStorage.setItem("ohm_assistant_session", id);
    } catch (e) {
      /* not fatal: the id just will not survive a reload */
    }
    return id;
  }

  /* ------------------------------------------------------------- icons */

  var SVG =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round"';

  var ICON = {
    headset:
      "<svg " + SVG + ' width="18" height="18">' +
      '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/>' +
      '<path d="M4 14h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>' +
      '<path d="M20 14h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z"/></svg>',
    chat:
      "<svg " + SVG + ' width="15" height="15">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',
    mic:
      "<svg " + SVG + ' width="15" height="15">' +
      '<rect x="9" y="2" width="6" height="11" rx="3"/>' +
      '<path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg>',
    send:
      "<svg " + SVG + ' width="17" height="17">' +
      '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    clip:
      "<svg " + SVG + ' width="18" height="18">' +
      '<path d="M21.4 11.1l-8.5 8.5a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/></svg>',
  };

  /* ------------------------------------------------------------- styles */

  var CSS = `
:host{all:initial}
*,*::before,*::after{box-sizing:border-box}
button,input{font:inherit;color:inherit;margin:0}

.fab{position:fixed;${SIDE}:20px;bottom:20px;z-index:2147483000;display:inline-flex;
  align-items:center;gap:9px;padding:13px 20px;border:none;border-radius:999px;cursor:pointer;
  /* --color-inverse, not --color-ink. The host page's tokens are inherited
     through the shadow boundary, and in the site's dark theme --color-ink
     flips to a near-white while --color-oninverse stays near-white too, so a
     pill painted with that pair went light on light and disappeared.
     inverse/oninverse is defined as a contrasting pair in both themes. */
  background:var(--color-inverse,#101828);color:var(--color-oninverse,#fff);
  font:600 15px/1 var(--font-body,"Source Sans 3",system-ui,-apple-system,sans-serif);
  /* An accent ring, because the pill is near-black and so is the site in its
     dark theme: the text was readable but the shape of the button was not,
     which is the same as not seeing it. The ring carries its edge on either
     background. */
  box-shadow:0 0 0 1.5px rgb(var(--accent-rgb,215 154 55) / .75),
             0 10px 30px -10px rgba(16,24,40,.45)}
.fab:hover{transform:translateY(-1px);
  box-shadow:0 0 0 2px rgb(var(--accent-rgb,215 154 55) / .95),
             0 14px 34px -12px rgba(16,24,40,.5)}

.panel{position:fixed;${SIDE}:20px;bottom:20px;z-index:2147483000;
  width:min(408px,calc(100vw - 32px));height:min(660px,calc(100vh - 40px));
  display:flex;flex-direction:column;overflow:hidden;text-align:left;
  background:var(--color-surface,#fff);color:var(--color-ink,#101828);
  border:1px solid var(--color-line,#d9ddd8);border-radius:var(--radius-card,14px);
  box-shadow:0 24px 64px -18px rgba(16,24,40,.38);
  font:400 15px/1.55 var(--font-body,"Source Sans 3",system-ui,-apple-system,sans-serif)}
[hidden]{display:none!important}

.head{display:flex;align-items:center;gap:12px;padding:15px 16px}
.ico{width:40px;height:40px;flex:0 0 auto;border-radius:12px;display:grid;place-items:center;
  background:var(--color-amber,#d79a37);color:#fff}
.who{display:flex;flex-direction:column;gap:3px;min-width:0}
.who strong{font:600 16px/1.1 var(--font-display,"Instrument Sans",system-ui,sans-serif)}
.who em{font-style:normal;font-size:12px;color:var(--color-muted,#667085);
  display:flex;align-items:center;gap:6px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--color-success,#067647);
  flex:0 0 auto;animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.x{margin-left:auto;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;
  color:var(--color-muted,#667085);padding:7px}
.x:hover{color:var(--color-ink,#101828)}

.tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--color-line,#d9ddd8)}
.tabs button{display:inline-flex;align-items:center;justify-content:center;gap:7px;
  padding:12px 8px;background:none;border:none;cursor:pointer;
  border-bottom:2px solid transparent;margin-bottom:-1px;
  color:var(--color-muted,#667085);font-weight:600;font-size:14.5px;line-height:1}
.tabs button:hover{color:var(--color-ink,#101828)}
.tabs button.on{color:var(--color-ink,#101828);border-bottom-color:var(--color-amber,#d79a37)}

.thread{flex:1;min-height:0;overflow-y:auto;padding:18px 16px;
  display:flex;flex-direction:column;gap:10px}
.bub{max-width:88%;padding:12px 15px;border-radius:14px;font-size:14.5px;
  white-space:pre-wrap;overflow-wrap:break-word;
  animation:in .22s cubic-bezier(.2,.7,.3,1) both}
@keyframes in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.bub.assistant{align-self:flex-start;background:var(--color-warm,#f7f6f2);
  border:1px solid var(--color-line,#d9ddd8);border-bottom-left-radius:5px}
.bub.user{align-self:flex-end;background:var(--color-inverse,#101828);
  color:var(--color-oninverse,#fff);border-bottom-right-radius:5px}
/* A person, not the assistant. Tinted in the brand tan and labelled above, so
   the visitor can tell at a glance which answers came from a human. */
.bub.human{align-self:flex-start;background:var(--color-amber-soft,#faf3e8);
  border:1px solid var(--color-amber,#d79a37);border-bottom-left-radius:5px}
/* Not .who: that class is already the panel header's name block above, and
   reusing it here restyled the header. */
.from{align-self:flex-start;font-size:11px;font-weight:600;letter-spacing:.07em;
  text-transform:uppercase;color:var(--color-amber-deep,#8f5a0e);margin:2px 0 -4px}
/* Anything the system noted: a plain centred line, never a bubble, because it
   is not something anybody said. */
.sys{align-self:center;max-width:92%;text-align:center;font-size:12px;
  color:var(--color-muted,#667085);padding:2px 0}

/* The banner that says a person is on it. */
.handoff{display:flex;gap:9px;align-items:flex-start;margin:0 16px 10px;padding:11px 13px;
  border-radius:12px;font-size:13px;line-height:1.5;
  background:var(--color-amber-soft,#faf3e8);
  border:1px solid var(--color-amber,#d79a37);color:var(--color-amber-deep,#8f5a0e)}
.handoff b{display:block;color:var(--color-ink,#101828);font-size:13.5px}
.handoff .dot{flex:0 0 auto;width:7px;height:7px;border-radius:50%;margin-top:5px;
  background:var(--color-amber,#d79a37)}
/* A count of replies that arrived while the pill was shut. */
.fab .unread{position:absolute;top:-3px;right:-3px;min-width:19px;height:19px;padding:0 5px;
  border-radius:999px;background:var(--color-amber,#d79a37);color:#fff;
  font-size:11px;font-weight:700;display:grid;place-items:center}
.typing{display:inline-flex;gap:4px;align-items:center;padding:14px;align-self:flex-start;
  background:var(--color-warm,#f7f6f2);border:1px solid var(--color-line,#d9ddd8);
  border-radius:14px;border-bottom-left-radius:5px}
.typing i{width:6px;height:6px;border-radius:50%;background:var(--color-muted,#667085);
  animation:bounce 1.2s infinite ease-in-out}
.typing i:nth-child(2){animation-delay:.15s}
.typing i:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}

.chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 12px}
.chips button{padding:9px 15px;border-radius:999px;cursor:pointer;font-size:13.5px;
  background:var(--color-surface,#fff);color:var(--color-ink,#101828);
  border:1px solid var(--color-line,#d9ddd8)}
.chips button:hover:not(:disabled){border-color:var(--color-amber,#d79a37);
  color:var(--color-amber-deep,#8f5a0e)}
.chips button:disabled{opacity:.5;cursor:not-allowed}

.compose{display:flex;gap:9px;align-items:center;padding:0 16px 14px}
.compose input{flex:1;min-width:0;padding:13px 17px;border-radius:999px;font-size:14.5px;
  border:1px solid var(--color-line,#d9ddd8);background:var(--color-surface,#fff);
  color:var(--color-ink,#101828)}
.compose input:focus{outline:none;border-color:var(--color-amber,#d79a37)}
.compose button{width:46px;height:46px;flex:0 0 auto;border-radius:50%;border:none;cursor:pointer;
  display:grid;place-items:center;background:var(--color-amber,#d79a37);color:#fff}
.compose button:hover:not(:disabled){background:var(--color-amber-deep,#8f5a0e)}
.compose button:disabled{opacity:.4;cursor:not-allowed}
/* The paperclip is not the primary action, so it is not amber. Same 46px box
   as the send button, because both are touch targets and 44 is the floor. */
.compose button.clip{background:transparent;color:var(--color-muted,#667085);
  border:1px solid var(--color-line,#d9ddd8)}
.compose button.clip:hover:not(:disabled){background:var(--color-warm,#f7f6f2);
  color:var(--color-ink,#101828)}
.compose input[type=file]{display:none}

/* A photo or a voice note in the thread. Width is capped rather than set, so
   a tall phone photo does not take over the panel. */
.bub.att{padding:6px}
.bub img.shot{display:block;max-width:100%;max-height:230px;width:auto;height:auto;
  border-radius:9px}
.bub audio{display:block;width:230px;max-width:100%}
.bub .fname{display:block;margin:5px 3px 1px;font-size:11.5px;opacity:.75;
  word-break:break-all}
/* While it is going up. The bubble is already there, so the visitor can see
   their photo was taken even before it has arrived. */
.bub.att.pending{opacity:.55}

.voice{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:24px 26px;gap:3px}
.orb{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;
  background:var(--color-warm,#f7f6f2);border:1px solid var(--color-line,#d9ddd8);
  color:var(--color-amber,#d79a37);margin-bottom:18px}
.orb svg{width:34px;height:34px}
.orb.live{background:var(--color-amber,#d79a37);color:#fff;border-color:transparent;
  animation:ring 1.8s ease-out infinite}
.orb.connecting{animation:pulse 1.2s ease-in-out infinite}
@keyframes ring{0%{box-shadow:0 0 0 0 rgba(215,154,55,.5)}100%{box-shadow:0 0 0 22px rgba(215,154,55,0)}}
.voice h3{margin:0 0 7px;font:600 18px/1.2 var(--font-display,"Instrument Sans",system-ui,sans-serif)}
.voice p{margin:0;font-size:14px;color:var(--color-muted,#667085);max-width:34ch}
.vnote{margin-top:10px!important;font-size:13px!important}
.vnote.bad{color:var(--color-error,#b42318)!important}
.call{margin-top:22px;padding:14px 34px;border-radius:999px;cursor:pointer;
  border:1.5px solid rgb(var(--accent-rgb,215 154 55) / .75);
  background:var(--color-inverse,#101828);color:var(--color-oninverse,#fff);
  font-weight:600;font-size:15px;line-height:1}
.call.end{background:var(--color-error,#b42318)}
/* Still has to be visible while it is unavailable: at .5 opacity on a dark
   page the button vanished and the panel looked broken rather than busy. */
.call:disabled{cursor:not-allowed;opacity:.72;
  border-color:rgb(var(--accent-rgb,215 154 55) / .4)}
.vfoot{margin-top:18px!important;font-size:13px!important}
.vfoot a{color:var(--color-amber-deep,#8f5a0e)}

.foot{padding:11px 16px;text-align:center;font-size:12px;
  color:var(--color-muted,#667085);border-top:1px solid var(--color-line,#d9ddd8);
  background:var(--color-warm,#f7f6f2)}
.foot strong{color:var(--color-ink,#101828);font-weight:600}

@media (max-width:460px){
  .panel{right:8px;left:8px;bottom:8px;width:auto;height:min(82vh,660px)}
  .fab{${SIDE}:12px;bottom:12px}
}
@media (prefers-reduced-motion:reduce){
  .bub,.dot,.typing i,.orb.live,.orb.connecting{animation:none}
}
`;

  /* ------------------------------------------------------------- build */

  var host = document.createElement("div");
  host.id = "ohm-assistant-root";
  /* The host element itself must not take part in the page layout, or a theme
     with `div { margin }` shifts the footer. */
  host.style.cssText = "all:initial;position:static";
  var root = host.attachShadow({ mode: "open" });

  var style = document.createElement("style");
  style.textContent = CSS;
  root.appendChild(style);

  var wrap = document.createElement("div");
  wrap.innerHTML =
    '<button class="fab" type="button" aria-label="Open the assistant">' +
      ICON.headset + "<span>Ask the assistant</span></button>" +

    '<section class="panel" role="dialog" aria-modal="false" hidden ' +
            'aria-label="Online Marketing Help assistant">' +
      '<header class="head">' +
        '<span class="ico" aria-hidden="true">' + ICON.headset + "</span>" +
        '<span class="who"><strong>OMH Assistant</strong>' +
          '<em><i class="dot" aria-hidden="true"></i>' +
          "Assistant. Answers from our own information</em></span>" +
        '<button class="x" type="button" aria-label="Close">&#10005;</button>' +
      "</header>" +

      '<div class="tabs" role="tablist">' +
        '<button type="button" role="tab" data-tab="chat" class="on" aria-selected="true">' +
          ICON.chat + " Chat</button>" +
        '<button type="button" role="tab" data-tab="voice" aria-selected="false">' +
          ICON.mic + " Voice</button>" +
      "</div>" +

      '<div class="pane-chat">' +
        '<div class="thread" aria-live="polite"></div>' +
        '<div class="handoff" hidden role="status">' +
          '<span class="dot" aria-hidden="true"></span>' +
          '<span class="handoff-text"></span>' +
        "</div>" +
        '<div class="chips"></div>' +
        '<form class="compose">' +
          '<button type="button" class="clip" aria-label="Attach a photo or a voice note">' +
            ICON.clip + "</button>" +
          '<input type="file" class="file" ' +
                 'accept="image/jpeg,image/png,image/gif,image/webp,' +
                         'audio/ogg,audio/mpeg,audio/mp4,audio/webm,audio/aac,audio/amr" ' +
                 'aria-hidden="true" tabindex="-1">' +
          '<input type="text" placeholder="Type your question…" aria-label="Your message" ' +
                 'autocomplete="off">' +
          '<button type="submit" aria-label="Send" disabled>' + ICON.send + "</button>" +
        "</form>" +
      "</div>" +

      '<div class="voice" hidden>' +
        '<div class="orb" aria-hidden="true">' + ICON.headset + "</div>" +
        "<h3></h3><p class=\"vlead\"></p>" +
        '<p class="vnote" hidden></p>' +
        '<button class="call" type="button"></button>' +
        '<p class="vfoot">Prefer a person? Call <a href="tel:' + TEL + '">' + PHONE + "</a></p>" +
      "</div>" +

      '<footer class="foot">Assistant by <strong>Online Marketing Help</strong></footer>' +
    "</section>";
  root.appendChild(wrap);

  var $ = function (sel) { return root.querySelector(sel); };
  var fab = $(".fab");
  var panel = $(".panel");
  var thread = $(".thread");
  var chips = $(".chips");
  var form = $(".compose");
  var input = $(".compose input[type=text]");
  /* Anchored to the submit button specifically. It used to be ".compose
     button", which became the paperclip the moment a second button existed. */
  var sendBtn = $(".compose button[type=submit]");
  var clipBtn = $(".compose button.clip");
  var fileInput = $(".compose input[type=file]");
  var paneChat = $(".pane-chat");
  var handoff = $(".handoff");
  var handoffText = $(".handoff-text");
  var paneVoice = $(".voice");
  var orb = $(".orb");
  var vTitle = $(".voice h3");
  var vLead = $(".vlead");
  var vNote = $(".vnote");
  var callBtn = $(".call");
  var tabBtns = root.querySelectorAll(".tabs button");

  /* The chat pane is a flex child that must shrink; it is a plain div in the
     markup, so give it the same box the old component's fragment had. */
  paneChat.style.cssText = "flex:1;min-height:0;display:flex;flex-direction:column";

  CHIPS.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.addEventListener("click", function () { send(c); });
    chips.appendChild(b);
  });

  /* ------------------------------------------------------------- render */

  function renderThread() {
    thread.textContent = "";
    var lastRole = null;
    state.msgs.forEach(function (m) {
      /* A system note is not something anyone said, so it is a line rather
         than a bubble. */
      if (m.role === "system") {
        var s = document.createElement("div");
        s.className = "sys";
        s.textContent = m.text;
        thread.appendChild(s);
        lastRole = null;
        return;
      }
      /* Label the first bubble in a run from a person. Without it a tinted
         bubble is just a colour, and the visitor has no way to know they are
         no longer talking to the assistant. */
      if (m.role === "human" && lastRole !== "human") {
        var w = document.createElement("div");
        w.className = "from";
        w.textContent = "Online Marketing Help";
        thread.appendChild(w);
      }
      var d = document.createElement("div");
      d.className = "bub " + m.role;

      /* A photo or a voice note the visitor sent. Built with createElement
         and assignments rather than innerHTML, so the file name is text and
         cannot be markup however it was named. */
      if (m.att) {
        d.className += " att" + (m.att.pending ? " pending" : "");
        if (m.att.kind === "audio") {
          var au = document.createElement("audio");
          au.controls = true;
          au.src = m.att.url;
          d.appendChild(au);
        } else {
          var im = document.createElement("img");
          im.className = "shot";
          im.src = m.att.url;
          /* Their own photo, which they are looking at: describing it is not
             ours to do, and "image" would be noise to a screen reader. */
          im.alt = m.att.name || "The photo you sent";
          d.appendChild(im);
        }
        if (m.att.name) {
          var fn = document.createElement("span");
          fn.className = "fname";
          fn.textContent = m.att.name;
          d.appendChild(fn);
        }
        if (m.text) {
          var cap = document.createElement("span");
          cap.className = "fname";
          cap.textContent = m.text;
          d.appendChild(cap);
        }
        thread.appendChild(d);
        lastRole = m.role;
        return;
      }

      /* textContent, never innerHTML: the reply is ours, but a knowledge base
         is edited by people and must never be able to inject markup. */
      d.textContent = m.text;
      thread.appendChild(d);
      lastRole = m.role;
    });
    if (state.sending) {
      var t = document.createElement("div");
      t.className = "typing";
      t.setAttribute("aria-label", "typing");
      t.innerHTML = "<i></i><i></i><i></i>";
      thread.appendChild(t);
    }
    thread.scrollTop = thread.scrollHeight;
  }

  function renderVoice() {
    var v = state.voice;
    orb.className = "orb" + (v === "live" ? " live" : v === "connecting" ? " connecting" : "");
    vTitle.textContent =
      v === "live" ? "You are on a call" : v === "connecting" ? "Connecting…" : "Talk to the assistant";
    vLead.textContent =
      v === "live"
        ? "Speak normally. You can interrupt at any time. " + mmss()
        : "It answers in English, from our own information, and can book your " +
          "consultation. Your browser will ask for the microphone.";
    vNote.textContent = state.note;
    vNote.hidden = !state.note;
    vNote.className = "vnote" + (v === "error" ? " bad" : "");
    callBtn.textContent = v === "live" ? "End call" : v === "connecting" ? "Connecting…" : "Start call";
    callBtn.className = "call" + (v === "live" ? " end" : "");
    callBtn.disabled = v === "connecting";
  }

  function render() {
    fab.hidden = state.open;
    panel.hidden = !state.open;
    paneChat.hidden = state.tab !== "chat";
    paneVoice.hidden = state.tab !== "voice";
    for (var i = 0; i < tabBtns.length; i++) {
      var on = tabBtns[i].dataset.tab === state.tab;
      tabBtns[i].className = on ? "on" : "";
      tabBtns[i].setAttribute("aria-selected", on ? "true" : "false");
    }
    root.querySelectorAll(".chips button").forEach(function (b) { b.disabled = state.sending; });
    sendBtn.disabled = state.sending || !input.value.trim();
    clipBtn.disabled = state.uploading;
    /* The suggested questions are the assistant's. While a person has the
       conversation they would send the visitor back round the model, so they
       go away until it is handed back. */
    var withPerson = state.handover === "waiting" || state.handover === "live";
    chips.hidden = withPerson;
    input.placeholder = withPerson ? "Type your message…" : "Type your question…";
    renderHandoff();
    renderUnread();
    renderThread();
    renderVoice();
  }

  function renderUnread() {
    var badge = fab.querySelector(".unread");
    if (!state.unread) {
      if (badge) badge.remove();
      return;
    }
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "unread";
      fab.appendChild(badge);
    }
    badge.textContent = String(state.unread);
    badge.setAttribute(
      "aria-label",
      state.unread + (state.unread === 1 ? " new reply" : " new replies"),
    );
  }

  function mmss() {
    var m = Math.floor(state.secs / 60), s = state.secs % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  /* ------------------------------------------------------------- chat */

  function send(text) {
    var clean = (text || "").trim();
    if (!clean || state.sending) return;
    input.value = "";
    state.msgs.push({ role: "user", text: clean });

    /* A person has the conversation, so the model must not answer over the
       top of them. The message goes to the thread the person is reading and
       no typing indicator is shown: there is nothing automatic coming, and
       pretending otherwise would promise a reply in seconds that a human
       cannot give. */
    if (state.handover === "waiting" || state.handover === "live") {
      render();
      startPolling();
      fetch(SAY_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: sess, visitorId: visitor, text: clean, pageUrl: location.href }),
      }).catch(function () {
        state.msgs.push({
          role: "system",
          text:
            "That message may not have reached us. If it is urgent, call " +
            PHONE + ".",
        });
        render();
      });
      input.focus();
      return;
    }

    state.sending = true;
    render();

    fetch(CHAT_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        session_id: sess,
        visitor_id: visitor,
        message: clean,
        page_url: location.href,
      }),
    })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(function (d) {
        state.msgs.push({
          role: "assistant",
          text: d.reply || "Sorry, could you put that another way?",
        });
      })
      .catch(function () {
        /* Never leave someone staring at a dead box. Give them a way through. */
        state.msgs.push({
          role: "assistant",
          text:
            "Sorry, I cannot reach our system right now. Please call " +
            PHONE + " or email " + EMAIL + " and the team will pick it up.",
        });
      })
      .then(function () {
        state.sending = false;
        render();
        input.focus();
        /* Check now, not on the next heartbeat. The turn that just finished
           is the one most likely to have handed the conversation over, and
           until the panel knows that, the banner is missing and the next
           thing the visitor types goes to the assistant instead of to the
           person who has just been handed their question. */
        pollNow();
      });
  }

  /* ------------------------------------------------------- history */

  /* Their own conversation, put back where they left it.

     Until this existed the panel told a returning visitor "we can pick up
     where we left off" and then showed them an empty box, which is a
     promise the product did not keep. Everything said was already in the
     database; nothing was reading it back.

     Loaded on the visitor id rather than the session id, because the
     session id is in sessionStorage and does not survive closing the tab,
     which is exactly the case this is for. */
  function loadHistory() {
    fetch(HISTORY_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      /* Both, and the server checks that the session belongs to the
         visitor. Either one alone is not enough to read a transcript. */
      body: JSON.stringify({ sessionId: sess, visitorId: visitor }),
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.messages || !d.messages.length) return;

        /* Only into a panel they have not started using. If they typed
           while this was in flight, their message is the conversation now
           and dropping an old transcript on top of it would be worse than
           showing none. */
        if (state.msgs.length !== 1) return;

        var greeting = state.msgs[0];
        var older = [];

        if (d.trimmed) {
          /* Said rather than implied. A panel that silently shows the last
             sixty messages is claiming that is everything. */
          older.push({ role: "system", text: "Earlier messages are not shown here." });
        }

        for (var i = 0; i < d.messages.length; i++) {
          var m = d.messages[i];
          var row = { role: m.role === "user" ? "user" : m.role, text: m.text };
          /* A photo or a voice note they sent last time, still in the
             thread. `url` is null when the file has gone from storage, and
             then the text ("Sent a photo") stands on its own. */
          if (m.attachment && m.attachment.url) {
            row.att = {
              url: m.attachment.url,
              kind: m.attachment.kind,
              name: m.attachment.name || "",
            };
            /* The caption is already the bubble; repeating the stand-in
               text under it reads as a mistake. */
            if (row.text === "Sent a photo" || row.text === "Sent a voice note") row.text = "";
          }
          older.push(row);
        }

        /* The greeting belongs at the bottom, under what was said before:
           it is the newest thing in the panel, not the oldest. */
        state.msgs = older.concat([greeting]);

        /* So the handover poll asks for what is new rather than replaying
           everything this just loaded. */
        if (d.lastAt) state.seenAt = Math.max(state.seenAt, d.lastAt);
        render();
      })
      .catch(function () {
        /* No history is the normal case for most visitors, so a failure
           here changes nothing they can see. */
      });
  }

  /* --------------------------------------------------- attachments */

  /* Why the refusal is a sentence and not a code: the visitor has just tried
     to show us the thing they are asking about, which is the most useful
     message they will send all conversation. "Refused" without a reason is
     how that turns into them giving up. */
  var MB = 1024 * 1024;
  function refusal(why, limit) {
    if (why === "too_big") {
      return (
        "That file is a little large to send here. Photos up to " +
        Math.round((limit || LIMITS.image) / MB) +
        "MB work best. If it is easier, email it to " + EMAIL + "."
      );
    }
    if (why === "wrong_type" || why === "not_what_it_claims") {
      return (
        "I can take a photo (JPG, PNG, GIF or WebP) or a voice note. " +
        "For anything else, email it to " + EMAIL + " and the team will pick it up."
      );
    }
    if (why === "empty") return "That file came through empty. Could you try sending it again?";
    if (why === "too_many") {
      return "That is a few files in a short time. Email anything else to " + EMAIL + ".";
    }
    return "That did not upload. If it is important, email it to " + EMAIL + ".";
  }

  function note(text) {
    state.msgs.push({ role: "system", text: text });
    render();
  }

  function sendFile(file) {
    if (!file || state.uploading) return;

    /* Only the head is read, because that is all the sniffer looks at. The
       alternative is pulling an eight megabyte photo into memory to check
       its first four bytes. */
    file.slice(0, 64).arrayBuffer().then(function (buf) {
      var v = checkAttachment(file, new Uint8Array(buf));
      if (!v.ok) { note(refusal(v.why, v.limit)); return; }

      /* The bubble appears now, dimmed, with the local copy of the file in
         it. A visitor who has just picked a photo should see it in the
         thread immediately; waiting for a round trip reads as nothing having
         happened, and they pick it again. */
      var local = URL.createObjectURL(file);
      var msg = {
        role: "user",
        text: "",
        att: { url: local, kind: v.kind, name: v.name, pending: true },
      };
      state.msgs.push(msg);
      state.uploading = true;
      render();

      var fail = function (why) {
        /* The optimistic bubble goes, because it is now a claim that
           something was sent when it was not. */
        var i = state.msgs.indexOf(msg);
        if (i !== -1) state.msgs.splice(i, 1);
        URL.revokeObjectURL(local);
        state.uploading = false;
        note(refusal(why));
      };

      fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: sess, visitorId: visitor }),
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d || !d.ok || !d.url) throw new Error(d && d.error ? d.error : "no_url");
          /* Straight to Convex storage. The file never passes through n8n or
             the website's own server, so nothing in the middle has to be
             sized for an eight megabyte body. */
          return fetch(d.url, {
            method: "POST",
            headers: { "content-type": v.type },
            body: file,
          });
        })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d || !d.storageId) throw new Error("no_storage_id");
          return fetch(ATTACH_URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              sessionId: sess,
              storageId: d.storageId,
              kind: v.kind,
              type: v.type,
              name: v.name,
              pageUrl: location.href,
            }),
          });
        })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          /* The server judged the bytes it actually received, and it is
             allowed to disagree with the browser. If it does, the browser is
             wrong. */
          if (!d || d.ok !== true) throw new Error((d && d.why) || "refused");
          msg.att.pending = false;
          state.uploading = false;
          render();

          /* And now ask for an answer.

             Without this the file was stored, shown, and met with silence:
             the assistant was never told anything had arrived. A visitor
             who sends a photo of the thing they are asking about and gets
             no reply assumes the whole widget is broken. */
          askAboutFile(v.kind, (d.attachment && d.attachment.storageId) || null);
        })
        .catch(function (e) { fail(String((e && e.message) || "")); });
    }).catch(function () {
      note("I could not read that file. Could you try another?");
    });
  }

  /* The turn that follows an upload.

     The storage id goes up, never a URL: the server resolves it. Handing a
     workflow an address chosen in the browser is the forgery the Meta path
     is careful about, and it would be no better coming from here. */
  function askAboutFile(kind, storageId) {
    /* While a person has the conversation the assistant must not answer
       over them. They can see the photo in the thread; that is enough. */
    if (state.handover === "waiting" || state.handover === "live") return;

    state.sending = true;
    render();

    fetch(CHAT_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        session_id: sess,
        visitor_id: visitor,
        message: kind === "audio" ? "[voice note]" : "[photo]",
        attachment: { storageId: storageId, kind: kind },
        page_url: location.href,
      }),
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        state.msgs.push({
          role: "assistant",
          text:
            (d && d.reply) ||
            (kind === "audio"
              ? "Thanks. I cannot listen to voice notes yet, but the team can. What is it about?"
              : "Thanks. I could not open that one. Could you tell me what it shows?"),
        });
      })
      .catch(function () {
        state.msgs.push({
          role: "assistant",
          text: "Thanks for that. Tell me what you would like me to look at and I will help.",
        });
      })
      .then(function () {
        state.sending = false;
        render();
        pollNow();
      });
  }

  clipBtn.addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () {
    var f = fileInput.files && fileInput.files[0];
    /* Cleared on purpose: without it, picking the same file twice in a row
       fires no change event and nothing happens. */
    fileInput.value = "";
    if (f) sendFile(f);
  });

  /* ------------------------------------------------------- handover */

  var pollTimer = null;
  /* Whether the loop is running, kept apart from the timer handle: a one off
     check clears the handle to ask immediately, and without this flag that
     would read as "the loop has stopped" and leave it stopped. */
  var polling = false;

  /* Open and in a handover: every few seconds, because somebody is typing an
     answer right now. Shut, or not in a handover: a slow heartbeat, enough to
     notice a reply and put a count on the pill without calling out
     continuously on a page left open all afternoon. */
  function pollEvery() {
    if (state.handover === "waiting" || state.handover === "live") {
      return state.open ? 4000 : 15000;
    }
    return 20000;
  }

  /* One tick: ask, then schedule the next at whatever cadence the answer
     implies. Hoisted out of startPolling so a one off check can reschedule
     the loop it belongs to rather than leaving it on the old cadence. */
  function tick() {
    return poll().then(function () {
      if (!polling) return;
      clearTimeout(pollTimer);
      pollTimer = setTimeout(tick, pollEvery());
    });
  }

  function startPolling() {
    if (polling) return;
    polling = true;
    pollTimer = setTimeout(tick, 1200);
  }

  /** Ask straight away, and keep the loop running at the right speed after. */
  function pollNow() {
    startPolling();
    clearTimeout(pollTimer);
    return tick().then(render);
  }

  function poll() {
    return fetch(POLL_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: sess, since: state.seenAt }),
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.messages) return;
        var was = state.handover;
        state.handover = d.handover || "none";

        var added = 0;
        d.messages.forEach(function (m) {
          if (m.at > state.seenAt) state.seenAt = m.at;
          /* The assistant's own replies already arrived through the chat
             call, so taking them again here would print each one twice. Only
             a person's words and the system's notes are new to this panel. */
          if (m.role !== "human" && m.role !== "system") return;
          state.msgs.push({ role: m.role, text: m.text });
          if (m.role === "human") added++;
        });

        if (added && !state.open) state.unread += added;
        if (added || was !== state.handover) render();
      })
      .catch(function () {
        /* A failed poll is not worth telling anyone about: the next one is a
           few seconds away, and the conversation is unaffected. */
      });
  }

  function renderHandoff() {
    var h = state.handover;
    handoff.hidden = h !== "waiting" && h !== "live";
    if (handoff.hidden) return;
    handoffText.innerHTML = "";
    var b = document.createElement("b");
    b.textContent =
      h === "live" ? "You are talking to a person" : "Getting a person for you";
    var p = document.createTextNode(
      h === "live"
        ? "Replies here come from the Online Marketing Help team, not the assistant."
        : "Your question needs a person. Someone is being brought in. You can keep typing, or call " +
          PHONE + " if it is urgent.",
    );
    handoffText.appendChild(b);
    handoffText.appendChild(p);
  }

  /* ------------------------------------------------------------- voice */

  var sdkPromise = null;

  function loadSdk() {
    if (sdkPromise) return sdkPromise;
    /* The URL is held in a variable so the bundler cannot resolve it at build
       time and inline the SDK into this file. */
    var url = RETELL_SDK;
    sdkPromise = import(url).then(function (m) {
      var C = m && (m.RetellWebClient || (m.default && m.default.RetellWebClient));
      if (!C) throw new Error("sdk");
      return C;
    });
    /* A failed load must not be cached, or the second attempt can never work. */
    sdkPromise.catch(function () { sdkPromise = null; });
    return sdkPromise;
  }

  function startVoice() {
    if (state.voice === "live" || state.voice === "connecting") return;
    state.voice = "connecting";
    state.note = "Connecting…";
    render();

    loadSdk()
      .then(function (Client) {
        if (!Client) throw new Error("sdk");
        return fetch(VOICE_TOKEN_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ session_id: sess, visitor_id: visitor, page_url: location.href }),
        }).then(function (r) {
          /* text(), not json(): when the token workflow fails upstream it
             answers 200 with an empty body, and r.json() then threw a parse
             error that landed in the catch below as "the microphone was
             blocked", which was never true and sent people to check their
             browser settings over a billing problem. */
          return r.text().then(function (body) {
            var d = null;
            try { d = body ? JSON.parse(body) : null; } catch (e) { /* not json */ }
            if (!r.ok || !d || !d.access_token) {
              if (window.console && console.warn) {
                console.warn("[OMH assistant] voice token: HTTP " + r.status + " " +
                  (body ? body.slice(0, 300) : "(empty body)"));
              }
              throw new Error("token");
            }
            return { Client: Client, token: d.access_token };
          });
        });
      })
      .then(function (o) {
        var client = new o.Client();
        retell = client;

        client.on("call_started", function () {
          state.voice = "live";
          state.note = "";
          clearInterval(timer);
          state.secs = 0;
          timer = setInterval(function () { state.secs++; renderVoice(); }, 1000);
          render();
        });
        client.on("call_ended", function () {
          state.voice = "idle";
          state.note = "Call ended.";
          clearInterval(timer);
          render();
        });
        client.on("error", function () {
          state.voice = "error";
          state.note = "The call dropped. Please try again or ring " + PHONE + ".";
          clearInterval(timer);
          try { client.stopCall(); } catch (e) { /* already gone */ }
          render();
        });
        /* Mirror the call into the same thread, so chat and voice stay one
           conversation and the caller can read back what they agreed. */
        client.on("update", function (u) {
          var tr = u && u.transcript;
          var last = tr && tr[tr.length - 1];
          if (!last || !last.content) return;
          var role = last.role === "agent" ? "assistant" : "user";
          var prev = state.msgs[state.msgs.length - 1];
          if (prev && prev.role === role && last.content.indexOf(prev.text) === 0) {
            prev.text = last.content;
          } else if (prev && prev.role === role && prev.text === last.content) {
            return;
          } else {
            state.msgs.push({ role: role, text: last.content });
          }
          renderThread();
        });

        return client.startCall({ accessToken: o.token });
      })
      .catch(function (e) {
        state.voice = "error";
        /* Three different failures, three different things to do about them.
           Lumping them together told most people to go and check a microphone
           permission that was never the problem. The reason we need is in the
           console; the visitor gets the one that helps them. */
        var mic = e && (e.name === "NotAllowedError" || e.name === "NotFoundError" ||
                        e.name === "SecurityError");
        state.note = mic
          ? "Your browser blocked the microphone. Allow it for this site and try " +
            "again, or ring " + PHONE + "."
          : e && e.message === "sdk"
            ? "The voice line could not load. Please use the Chat tab, or ring " +
              PHONE + "."
            : "The voice line is not available at the moment. Chat still works, " +
              "or you can ring " + PHONE + ".";
        if (window.console && console.warn) console.warn("[OMH assistant] voice:", e);
        render();
      });
  }

  function stopVoice() {
    try { if (retell) retell.stopCall(); } catch (e) { /* already stopped */ }
    clearInterval(timer);
    state.voice = "idle";
    render();
  }

  /* ------------------------------------------------------------- wiring */

  fab.addEventListener("click", function () {
    state.open = true;
    /* They are looking at the replies now, so the count has done its job. */
    state.unread = 0;
    render();
    input.focus();
    /* Opening the panel is a reason to check, always. A person may have
       answered while it was shut, or the conversation may have been handed
       over somewhere else entirely, on a call. Deliberately not conditional
       on the loop already running: before the visitor has typed anything
       there is no loop, and that was exactly the case where a waiting reply
       stayed invisible. One request, on a deliberate action. */
    pollNow();
  });

  $(".x").addEventListener("click", function () {
    stopVoice();
    state.open = false;
    render();
  });

  for (var i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener("click", function () {
      state.tab = this.dataset.tab;
      render();
      if (state.tab === "chat") input.focus();
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    send(input.value);
  });
  input.addEventListener("input", function () {
    sendBtn.disabled = state.sending || !input.value.trim();
  });

  callBtn.addEventListener("click", function () {
    if (state.voice === "live") stopVoice();
    else startVoice();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.open) {
      stopVoice();
      state.open = false;
      render();
    }
  });

  /* A live call must not survive the page it belongs to. */
  window.addEventListener("pagehide", function () {
    try { if (retell) retell.stopCall(); } catch (e) { /* going anyway */ }
  });

  function mount() {
    document.body.appendChild(host);
    render();
    /* A conversation that was already running when this page loaded may be
       with a person right now. Find out before the visitor types anything. */
    if (resumed) startPolling();
    hello();
  }

  /* Tell the server which person this visit belongs to, and find out whether
     they have been here before. One call, on every page load, before anything
     is typed: it is what ties this conversation to the earlier ones so a
     returning visitor is not captured as a second lead. */
  function hello() {
    fetch(HELLO_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: sess,
        visitorId: visitor,
        channel: "chat",
        pageUrl: location.href,
        attribution: attribution() || undefined,
      }),
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d) return;

        /* This page may have loaded into the middle of a handover: they
           refreshed while waiting, or the escalation came from a call. Start
           listening now, or their next message goes to the assistant and it
           answers over the person who is already on it. */
        if (d.withPerson) {
          state.handover = d.handover || "waiting";
          startPolling();
          render();
        }

        if (!d.returning) return;

        /* Recognised, so the greeting changes rather than a second one
           arriving under it. Only while the opener is still the only thing
           in the thread: this answer can land after a fast typist has
           already sent something, and rewriting a greeting they have
           replied to would make the conversation read backwards. */
        if (state.msgs.length === 1 && state.msgs[0].text === OPENER) {
          state.msgs[0] = { role: "assistant", text: OPENER_BACK };
          render();
        }
        loadHistory();
      })
      .catch(function () {
        /* Not knowing them is the normal case, so a failure here changes
           nothing the visitor can see. */
      });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  /* A small handle, so the site can open the panel from its own "Chat to us"
     button instead of only the floating one. */
  window.OhmAssistant = {
    open: function (tab) {
      state.open = true;
      if (tab === "voice" || tab === "chat") state.tab = tab;
      render();
    },
    close: function () { stopVoice(); state.open = false; render(); },
    sessionId: function () { return sess; },
    /** The person, across visits. sessionId is only this visit. */
    visitorId: function () { return visitor; },
  };
})();
