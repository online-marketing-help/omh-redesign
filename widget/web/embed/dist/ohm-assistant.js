/* OMH site assistant. Chat and voice for onlinemarketinghelp.co.uk.
   Built from web/embed/src/embed.js - edit that, not this file. */
"use strict";(()=>{var R={image:8388608,audio:16777216},Je=["image/jpeg","image/png","image/gif","image/webp"],Be=["audio/ogg","audio/mpeg","audio/mp4","audio/webm","audio/aac","audio/amr"];function F(d){return Je.indexOf(d)!==-1?"image":Be.indexOf(d)!==-1?"audio":null}function De(d){if(!d||typeof d.length!="number"||d.length<4)return null;var h=d,r=function(k){return h[k]};return r(0)===255&&r(1)===216&&r(2)===255?"image/jpeg":r(0)===137&&r(1)===80&&r(2)===78&&r(3)===71?"image/png":r(0)===71&&r(1)===73&&r(2)===70?"image/gif":h.length>=12&&r(0)===82&&r(1)===73&&r(2)===70&&r(3)===70&&r(8)===87&&r(9)===69&&r(10)===66&&r(11)===80?"image/webp":r(0)===79&&r(1)===103&&r(2)===103&&r(3)===83?"audio/ogg":r(0)===73&&r(1)===68&&r(2)===51||r(0)===255&&(r(1)&224)===224?"audio/mpeg":r(0)===26&&r(1)===69&&r(2)===223&&r(3)===163?"audio/webm":h.length>=12&&r(4)===102&&r(5)===116&&r(6)===121&&r(7)===112?"audio/mp4":null}function qe(d,h,r,k){var S=F(h);if(!S)return{ok:!1,why:"wrong_type"};var f=S==="audio"?R.audio:R.image;if(typeof r=="number"){if(r<=0)return{ok:!1,why:"empty"};if(r>f)return{ok:!1,why:"too_big",limit:f}}if(k){var _=De(k);return _?F(_)!==S?{ok:!1,why:"not_what_it_claims"}:{ok:!0,kind:F(_),type:_,name:d,size:r}:{ok:!1,why:"not_what_it_claims"}}return{ok:!0,kind:S,type:h,name:d,size:r,limit:f}}function de(d,h){return!d||typeof d!="object"?{ok:!1,why:"no_file"}:qe(String(d.name||""),String(d.type||""),Number(d.size),h)}(function(){"use strict";if(window.__ohmAssistantLoaded)return;window.__ohmAssistantLoaded=!0;var d="https://n8n.srv1836598.hstgr.cloud",h=document.currentScript,r=h&&h.dataset||{},k=r.chatUrl||d+"/webhook/ohm-chat",S=r.voiceTokenUrl||d+"/webhook/ohm-voice-token",f=r.convexSite||"https://cool-ferret-103.convex.site",_=f+"/visitorPoll",ue=f+"/visitorSay",pe=f+"/visitorHello",he=f+"/visitor/attachment/url",fe=f+"/visitor/attachment/attach",me=f+"/visitor/history",Y=r.position==="left"?"left":"right",ge=r.retellSdk||"https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.0.5/+esm",b="020 3489 3934",ve="+442034893934",I="support@onlinemarketinghelp.co.uk",K="Hello. I can answer from Online Marketing Help's own information: services, what each one includes, packages and prices. I can also book you a free 30 minute consultation.",be="Welcome back. I still have your details, so we can pick up where we left off. What can I help you with?",xe=["What do you do?","How much is SEO?","Build a Shopify store?","Book a consultation"],t={open:!1,tab:"chat",msgs:[{role:"assistant",text:K}],sending:!1,uploading:!1,voice:"idle",note:"",secs:0,handover:"none",seenAt:Date.now(),unread:0},T=null,O=null,$=!1,m=ke(),y=ye();function ye(){try{var e=localStorage.getItem("ohm_visitor");if(e)return e;var o="p-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,10);return localStorage.setItem("ohm_visitor",o),o}catch(n){return m}}function we(){var e="ohm_attribution";try{var o=localStorage.getItem(e);if(o)return JSON.parse(o)}catch(p){}var n={};try{var s=new URLSearchParams(location.search);s.forEach(function(p,v){n[v.toLowerCase()]=p})}catch(p){n={}}var i="";try{i=document.referrer||"",i&&i.indexOf(location.hostname)!==-1&&(i="")}catch(p){i=""}var l={};function a(p,v){v&&String(v).trim()&&(l[p]=String(v).trim().slice(0,500))}if(a("gclid",n.gclid),a("fbclid",n.fbclid),a("source",n.utm_source),a("medium",n.utm_medium),a("campaign",n.utm_campaign),a("keyword",n.utm_term),a("adGroup",n.utm_content),a("campaignId",n.campaignid||n.campaign_id),a("adId",n.adid||n.ad_id||n.creative),a("landingPage",location.href),a("referrer",i),!l.gclid&&!l.fbclid&&!l.source&&!l.referrer)return null;try{localStorage.setItem(e,JSON.stringify(l))}catch(p){}return l}function ke(){try{var e=sessionStorage.getItem("ohm_assistant_session");if(e)return $=!0,e}catch(n){}var o="web-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8);try{sessionStorage.setItem("ohm_assistant_session",o)}catch(n){}return o}var L='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"',w={headset:"<svg "+L+' width="18" height="18"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M20 14h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z"/></svg>',chat:"<svg "+L+' width="15" height="15"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',mic:"<svg "+L+' width="15" height="15"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg>',send:"<svg "+L+' width="17" height="17"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',clip:"<svg "+L+' width="18" height="18"><path d="M21.4 11.1l-8.5 8.5a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/></svg>'},Se=`
:host{all:initial}
*,*::before,*::after{box-sizing:border-box}
button,input{font:inherit;color:inherit;margin:0}

.fab{position:fixed;${Y}:20px;bottom:20px;z-index:2147483000;display:inline-flex;
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

.panel{position:fixed;${Y}:20px;bottom:20px;z-index:2147483000;
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
  .fab{${Y}:12px;bottom:12px}
}
@media (prefers-reduced-motion:reduce){
  .bub,.dot,.typing i,.orb.live,.orb.connecting{animation:none}
}
`,M=document.createElement("div");M.id="ohm-assistant-root",M.style.cssText="all:initial;position:static";var A=M.attachShadow({mode:"open"}),X=document.createElement("style");X.textContent=Se,A.appendChild(X);var Q=document.createElement("div");Q.innerHTML='<button class="fab" type="button" aria-label="Open the assistant">'+w.headset+'<span>Ask the assistant</span></button><section class="panel" role="dialog" aria-modal="false" hidden aria-label="Online Marketing Help assistant"><header class="head"><span class="ico" aria-hidden="true">'+w.headset+'</span><span class="who"><strong>OMH Assistant</strong><em><i class="dot" aria-hidden="true"></i>Assistant. Answers from our own information</em></span><button class="x" type="button" aria-label="Close">&#10005;</button></header><div class="tabs" role="tablist"><button type="button" role="tab" data-tab="chat" class="on" aria-selected="true">'+w.chat+' Chat</button><button type="button" role="tab" data-tab="voice" aria-selected="false">'+w.mic+' Voice</button></div><div class="pane-chat"><div class="thread" aria-live="polite"></div><div class="handoff" hidden role="status"><span class="dot" aria-hidden="true"></span><span class="handoff-text"></span></div><div class="chips"></div><form class="compose"><button type="button" class="clip" aria-label="Attach a photo or a voice note">'+w.clip+'</button><input type="file" class="file" accept="image/jpeg,image/png,image/gif,image/webp,audio/ogg,audio/mpeg,audio/mp4,audio/webm,audio/aac,audio/amr" aria-hidden="true" tabindex="-1"><input type="text" placeholder="Type your question\u2026" aria-label="Your message" autocomplete="off"><button type="submit" aria-label="Send" disabled>'+w.send+'</button></form></div><div class="voice" hidden><div class="orb" aria-hidden="true">'+w.headset+'</div><h3></h3><p class="vlead"></p><p class="vnote" hidden></p><button class="call" type="button"></button><p class="vfoot">Prefer a person? Call <a href="tel:'+ve+'">'+b+'</a></p></div><footer class="foot">Assistant by <strong>Online Marketing Help</strong></footer></section>',A.appendChild(Q);var u=function(e){return A.querySelector(e)},P=u(".fab"),_e=u(".panel"),x=u(".thread"),Z=u(".chips"),Ee=u(".compose"),g=u(".compose input[type=text]"),ee=u(".compose button[type=submit]"),te=u(".compose button.clip"),N=u(".compose input[type=file]"),ne=u(".pane-chat"),oe=u(".handoff"),J=u(".handoff-text"),Ce=u(".voice"),Ie=u(".orb"),Te=u(".voice h3"),Oe=u(".vlead"),B=u(".vnote"),j=u(".call"),E=A.querySelectorAll(".tabs button");ne.style.cssText="flex:1;min-height:0;display:flex;flex-direction:column",xe.forEach(function(e){var o=document.createElement("button");o.type="button",o.textContent=e,o.addEventListener("click",function(){ie(e)}),Z.appendChild(o)});function ae(){x.textContent="";var e=null;if(t.msgs.forEach(function(n){if(n.role==="system"){var s=document.createElement("div");s.className="sys",s.textContent=n.text,x.appendChild(s),e=null;return}if(n.role==="human"&&e!=="human"){var i=document.createElement("div");i.className="from",i.textContent="Online Marketing Help",x.appendChild(i)}var l=document.createElement("div");if(l.className="bub "+n.role,n.att){if(l.className+=" att"+(n.att.pending?" pending":""),n.att.kind==="audio"){var a=document.createElement("audio");a.controls=!0,a.src=n.att.url,l.appendChild(a)}else{var p=document.createElement("img");p.className="shot",p.src=n.att.url,p.alt=n.att.name||"The photo you sent",l.appendChild(p)}if(n.att.name){var v=document.createElement("span");v.className="fname",v.textContent=n.att.name,l.appendChild(v)}if(n.text){var G=document.createElement("span");G.className="fname",G.textContent=n.text,l.appendChild(G)}x.appendChild(l),e=n.role;return}l.textContent=n.text,x.appendChild(l),e=n.role}),t.sending){var o=document.createElement("div");o.className="typing",o.setAttribute("aria-label","typing"),o.innerHTML="<i></i><i></i><i></i>",x.appendChild(o)}x.scrollTop=x.scrollHeight}function re(){var e=t.voice;Ie.className="orb"+(e==="live"?" live":e==="connecting"?" connecting":""),Te.textContent=e==="live"?"You are on a call":e==="connecting"?"Connecting\u2026":"Talk to the assistant",Oe.textContent=e==="live"?"Speak normally. You can interrupt at any time. "+Ae():"It answers in English, from our own information, and can book your consultation. Your browser will ask for the microphone.",B.textContent=t.note,B.hidden=!t.note,B.className="vnote"+(e==="error"?" bad":""),j.textContent=e==="live"?"End call":e==="connecting"?"Connecting\u2026":"Start call",j.className="call"+(e==="live"?" end":""),j.disabled=e==="connecting"}function c(){P.hidden=t.open,_e.hidden=!t.open,ne.hidden=t.tab!=="chat",Ce.hidden=t.tab!=="voice";for(var e=0;e<E.length;e++){var o=E[e].dataset.tab===t.tab;E[e].className=o?"on":"",E[e].setAttribute("aria-selected",o?"true":"false")}A.querySelectorAll(".chips button").forEach(function(s){s.disabled=t.sending}),ee.disabled=t.sending||!g.value.trim(),te.disabled=t.uploading;var n=t.handover==="waiting"||t.handover==="live";Z.hidden=n,g.placeholder=n?"Type your message\u2026":"Type your question\u2026",He(),Le(),ae(),re()}function Le(){var e=P.querySelector(".unread");if(!t.unread){e&&e.remove();return}e||(e=document.createElement("span"),e.className="unread",P.appendChild(e)),e.textContent=String(t.unread),e.setAttribute("aria-label",t.unread+(t.unread===1?" new reply":" new replies"))}function Ae(){var e=Math.floor(t.secs/60),o=t.secs%60;return(e<10?"0":"")+e+":"+(o<10?"0":"")+o}function ie(e){var o=(e||"").trim();if(!(!o||t.sending)){if(g.value="",t.msgs.push({role:"user",text:o}),t.handover==="waiting"||t.handover==="live"){c(),H(),fetch(ue,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:m,visitorId:y,text:o,pageUrl:location.href})}).catch(function(){t.msgs.push({role:"system",text:"That message may not have reached us. If it is urgent, call "+b+"."}),c()}),g.focus();return}t.sending=!0,c(),fetch(k,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session_id:m,visitor_id:y,message:o,page_url:location.href})}).then(function(n){if(!n.ok)throw new Error(String(n.status));return n.json()}).then(function(n){t.msgs.push({role:"assistant",text:n.reply||"Sorry, could you put that another way?"})}).catch(function(){t.msgs.push({role:"assistant",text:"Sorry, I cannot reach our system right now. Please call "+b+" or email "+I+" and the team will pick it up."})}).then(function(){t.sending=!1,c(),g.focus(),le()})}}function Ne(){fetch(me,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:m,visitorId:y})}).then(function(e){return e.ok?e.json():null}).then(function(e){if(!(!e||!e.messages||!e.messages.length)&&t.msgs.length===1){var o=t.msgs[0],n=[];e.trimmed&&n.push({role:"system",text:"Earlier messages are not shown here."});for(var s=0;s<e.messages.length;s++){var i=e.messages[s],l={role:i.role==="user"?"user":i.role,text:i.text};i.attachment&&i.attachment.url&&(l.att={url:i.attachment.url,kind:i.attachment.kind,name:i.attachment.name||""},(l.text==="Sent a photo"||l.text==="Sent a voice note")&&(l.text="")),n.push(l)}t.msgs=n.concat([o]),e.lastAt&&(t.seenAt=Math.max(t.seenAt,e.lastAt)),c()}}).catch(function(){})}var Me=1024*1024;function se(e,o){return e==="too_big"?"That file is a little large to send here. Photos up to "+Math.round((o||R.image)/Me)+"MB work best. If it is easier, email it to "+I+".":e==="wrong_type"||e==="not_what_it_claims"?"I can take a photo (JPG, PNG, GIF or WebP) or a voice note. For anything else, email it to "+I+" and the team will pick it up.":e==="empty"?"That file came through empty. Could you try sending it again?":e==="too_many"?"That is a few files in a short time. Email anything else to "+I+".":"That did not upload. If it is important, email it to "+I+"."}function D(e){t.msgs.push({role:"system",text:e}),c()}function Pe(e){!e||t.uploading||e.slice(0,64).arrayBuffer().then(function(o){var n=de(e,new Uint8Array(o));if(!n.ok){D(se(n.why,n.limit));return}var s=URL.createObjectURL(e),i={role:"user",text:"",att:{url:s,kind:n.kind,name:n.name,pending:!0}};t.msgs.push(i),t.uploading=!0,c();var l=function(a){var p=t.msgs.indexOf(i);p!==-1&&t.msgs.splice(p,1),URL.revokeObjectURL(s),t.uploading=!1,D(se(a))};fetch(he,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:m,visitorId:y})}).then(function(a){return a.json()}).then(function(a){if(!a||!a.ok||!a.url)throw new Error(a&&a.error?a.error:"no_url");return fetch(a.url,{method:"POST",headers:{"content-type":n.type},body:e})}).then(function(a){return a.json()}).then(function(a){if(!a||!a.storageId)throw new Error("no_storage_id");return fetch(fe,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:m,storageId:a.storageId,kind:n.kind,type:n.type,name:n.name,pageUrl:location.href})})}).then(function(a){return a.json()}).then(function(a){if(!a||a.ok!==!0)throw new Error(a&&a.why||"refused");i.att.pending=!1,t.uploading=!1,c()}).catch(function(a){l(String(a&&a.message||""))})}).catch(function(){D("I could not read that file. Could you try another?")})}te.addEventListener("click",function(){N.click()}),N.addEventListener("change",function(){var e=N.files&&N.files[0];N.value="",e&&Pe(e)});var z=null,q=!1;function je(){return t.handover==="waiting"||t.handover==="live"?t.open?4e3:15e3:2e4}function V(){return ze().then(function(){q&&(clearTimeout(z),z=setTimeout(V,je()))})}function H(){q||(q=!0,z=setTimeout(V,1200))}function le(){return H(),clearTimeout(z),V().then(c)}function ze(){return fetch(_,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:m,since:t.seenAt})}).then(function(e){return e.ok?e.json():null}).then(function(e){if(!(!e||!e.messages)){var o=t.handover;t.handover=e.handover||"none";var n=0;e.messages.forEach(function(s){s.at>t.seenAt&&(t.seenAt=s.at),!(s.role!=="human"&&s.role!=="system")&&(t.msgs.push({role:s.role,text:s.text}),s.role==="human"&&n++)}),n&&!t.open&&(t.unread+=n),(n||o!==t.handover)&&c()}}).catch(function(){})}function He(){var e=t.handover;if(oe.hidden=e!=="waiting"&&e!=="live",!oe.hidden){J.innerHTML="";var o=document.createElement("b");o.textContent=e==="live"?"You are talking to a person":"Getting a person for you";var n=document.createTextNode(e==="live"?"Replies here come from the Online Marketing Help team, not the assistant.":"Your question needs a person. Someone is being brought in. You can keep typing, or call "+b+" if it is urgent.");J.appendChild(o),J.appendChild(n)}}var C=null;function Ue(){if(C)return C;var e=ge;return C=import(e).then(function(o){var n=o&&(o.RetellWebClient||o.default&&o.default.RetellWebClient);if(!n)throw new Error("sdk");return n}),C.catch(function(){C=null}),C}function Re(){t.voice==="live"||t.voice==="connecting"||(t.voice="connecting",t.note="Connecting\u2026",c(),Ue().then(function(e){if(!e)throw new Error("sdk");return fetch(S,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session_id:m,visitor_id:y,page_url:location.href})}).then(function(o){return o.text().then(function(n){var s=null;try{s=n?JSON.parse(n):null}catch(i){}if(!o.ok||!s||!s.access_token)throw window.console&&console.warn&&console.warn("[OMH assistant] voice token: HTTP "+o.status+" "+(n?n.slice(0,300):"(empty body)")),new Error("token");return{Client:e,token:s.access_token}})})}).then(function(e){var o=new e.Client;return T=o,o.on("call_started",function(){t.voice="live",t.note="",clearInterval(O),t.secs=0,O=setInterval(function(){t.secs++,re()},1e3),c()}),o.on("call_ended",function(){t.voice="idle",t.note="Call ended.",clearInterval(O),c()}),o.on("error",function(){t.voice="error",t.note="The call dropped. Please try again or ring "+b+".",clearInterval(O);try{o.stopCall()}catch(n){}c()}),o.on("update",function(n){var s=n&&n.transcript,i=s&&s[s.length-1];if(!(!i||!i.content)){var l=i.role==="agent"?"assistant":"user",a=t.msgs[t.msgs.length-1];if(a&&a.role===l&&i.content.indexOf(a.text)===0)a.text=i.content;else{if(a&&a.role===l&&a.text===i.content)return;t.msgs.push({role:l,text:i.content})}ae()}}),o.startCall({accessToken:e.token})}).catch(function(e){t.voice="error";var o=e&&(e.name==="NotAllowedError"||e.name==="NotFoundError"||e.name==="SecurityError");t.note=o?"Your browser blocked the microphone. Allow it for this site and try again, or ring "+b+".":e&&e.message==="sdk"?"The voice line could not load. Please use the Chat tab, or ring "+b+".":"The voice line is not available at the moment. Chat still works, or you can ring "+b+".",window.console&&console.warn&&console.warn("[OMH assistant] voice:",e),c()}))}function U(){try{T&&T.stopCall()}catch(e){}clearInterval(O),t.voice="idle",c()}P.addEventListener("click",function(){t.open=!0,t.unread=0,c(),g.focus(),le()}),u(".x").addEventListener("click",function(){U(),t.open=!1,c()});for(var W=0;W<E.length;W++)E[W].addEventListener("click",function(){t.tab=this.dataset.tab,c(),t.tab==="chat"&&g.focus()});Ee.addEventListener("submit",function(e){e.preventDefault(),ie(g.value)}),g.addEventListener("input",function(){ee.disabled=t.sending||!g.value.trim()}),j.addEventListener("click",function(){t.voice==="live"?U():Re()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&t.open&&(U(),t.open=!1,c())}),window.addEventListener("pagehide",function(){try{T&&T.stopCall()}catch(e){}});function ce(){document.body.appendChild(M),c(),$&&H(),Ye()}function Ye(){fetch(pe,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:m,visitorId:y,channel:"chat",pageUrl:location.href,attribution:we()||void 0})}).then(function(e){return e.ok?e.json():null}).then(function(e){e&&(e.withPerson&&(t.handover=e.handover||"waiting",H(),c()),e.returning&&(t.msgs.length===1&&t.msgs[0].text===K&&(t.msgs[0]={role:"assistant",text:be},c()),Ne()))}).catch(function(){})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ce):ce(),window.OhmAssistant={open:function(e){t.open=!0,(e==="voice"||e==="chat")&&(t.tab=e),c()},close:function(){U(),t.open=!1,c()},sessionId:function(){return m},visitorId:function(){return y}}})();})();
