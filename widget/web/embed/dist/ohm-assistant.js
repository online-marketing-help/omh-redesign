/* OMH site assistant. Chat and voice for onlinemarketinghelp.co.uk.
   Built from web/embed/src/embed.js - edit that, not this file. */
(()=>{(function(){"use strict";if(window.__ohmAssistantLoaded)return;window.__ohmAssistantLoaded=!0;var _="https://n8n.srv1836598.hstgr.cloud",H=document.currentScript,b=H&&H.dataset||{},K=b.chatUrl||_+"/webhook/ohm-chat",F=b.voiceTokenUrl||_+"/webhook/ohm-voice-token",P=b.convexSite||"https://cool-ferret-103.convex.site",X=P+"/visitorPoll",Q=P+"/visitorSay",L=b.position==="left"?"left":"right",Z=b.retellSdk||"https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.0.5/+esm",d="020 3489 3934",ee="+442034893934",te="support@onlinemarketinghelp.co.uk",oe="Hello. I can answer from Online Marketing Help's own information: services, what each one includes, packages and prices. I can also book you a free 30 minute consultation.",ne=["What do you do?","How much is SEO?","Build a Shopify store?","Book a consultation"],t={open:!1,tab:"chat",msgs:[{role:"assistant",text:oe}],sending:!1,voice:"idle",note:"",secs:0,handover:"none",seenAt:Date.now(),unread:0},m=null,g=null,Y=!1,x=ae();function ae(){try{var e=sessionStorage.getItem("ohm_assistant_session");if(e)return Y=!0,e}catch(n){}var o="web-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8);try{sessionStorage.setItem("ohm_assistant_session",o)}catch(n){}return o}var w='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"',h={headset:"<svg "+w+' width="18" height="18"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M20 14h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z"/></svg>',chat:"<svg "+w+' width="15" height="15"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',mic:"<svg "+w+' width="15" height="15"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg>',send:"<svg "+w+' width="17" height="17"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>'},re=`
:host{all:initial}
*,*::before,*::after{box-sizing:border-box}
button,input{font:inherit;color:inherit;margin:0}

.fab{position:fixed;${L}:20px;bottom:20px;z-index:2147483000;display:inline-flex;
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

.panel{position:fixed;${L}:20px;bottom:20px;z-index:2147483000;
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
  .fab{${L}:12px;bottom:12px}
}
@media (prefers-reduced-motion:reduce){
  .bub,.dot,.typing i,.orb.live,.orb.connecting{animation:none}
}
`,k=document.createElement("div");k.id="ohm-assistant-root",k.style.cssText="all:initial;position:static";var y=k.attachShadow({mode:"open"}),j=document.createElement("style");j.textContent=re,y.appendChild(j);var R=document.createElement("div");R.innerHTML='<button class="fab" type="button" aria-label="Open the assistant">'+h.headset+'<span>Ask the assistant</span></button><section class="panel" role="dialog" aria-modal="false" hidden aria-label="Online Marketing Help assistant"><header class="head"><span class="ico" aria-hidden="true">'+h.headset+'</span><span class="who"><strong>OMH Assistant</strong><em><i class="dot" aria-hidden="true"></i>Assistant. Answers from our own information</em></span><button class="x" type="button" aria-label="Close">&#10005;</button></header><div class="tabs" role="tablist"><button type="button" role="tab" data-tab="chat" class="on" aria-selected="true">'+h.chat+' Chat</button><button type="button" role="tab" data-tab="voice" aria-selected="false">'+h.mic+' Voice</button></div><div class="pane-chat"><div class="thread" aria-live="polite"></div><div class="handoff" hidden role="status"><span class="dot" aria-hidden="true"></span><span class="handoff-text"></span></div><div class="chips"></div><form class="compose"><input type="text" placeholder="Type your question\u2026" aria-label="Your message" autocomplete="off"><button type="submit" aria-label="Send" disabled>'+h.send+'</button></form></div><div class="voice" hidden><div class="orb" aria-hidden="true">'+h.headset+'</div><h3></h3><p class="vlead"></p><p class="vnote" hidden></p><button class="call" type="button"></button><p class="vfoot">Prefer a person? Call <a href="tel:'+ee+'">'+d+'</a></p></div><footer class="foot">Assistant by <strong>Online Marketing Help</strong></footer></section>',y.appendChild(R);var i=function(e){return y.querySelector(e)},S=i(".fab"),ie=i(".panel"),c=i(".thread"),U=i(".chips"),se=i(".compose"),l=i(".compose input"),V=i(".compose button"),q=i(".pane-chat"),B=i(".handoff"),A=i(".handoff-text"),le=i(".voice"),de=i(".orb"),ce=i(".voice h3"),pe=i(".vlead"),N=i(".vnote"),C=i(".call"),f=y.querySelectorAll(".tabs button");q.style.cssText="flex:1;min-height:0;display:flex;flex-direction:column",ne.forEach(function(e){var o=document.createElement("button");o.type="button",o.textContent=e,o.addEventListener("click",function(){$(e)}),U.appendChild(o)});function D(){c.textContent="";var e=null;if(t.msgs.forEach(function(n){if(n.role==="system"){var a=document.createElement("div");a.className="sys",a.textContent=n.text,c.appendChild(a),e=null;return}if(n.role==="human"&&e!=="human"){var s=document.createElement("div");s.className="from",s.textContent="Online Marketing Help",c.appendChild(s)}var p=document.createElement("div");p.className="bub "+n.role,p.textContent=n.text,c.appendChild(p),e=n.role}),t.sending){var o=document.createElement("div");o.className="typing",o.setAttribute("aria-label","typing"),o.innerHTML="<i></i><i></i><i></i>",c.appendChild(o)}c.scrollTop=c.scrollHeight}function J(){var e=t.voice;de.className="orb"+(e==="live"?" live":e==="connecting"?" connecting":""),ce.textContent=e==="live"?"You are on a call":e==="connecting"?"Connecting\u2026":"Talk to the assistant",pe.textContent=e==="live"?"Speak normally. You can interrupt at any time. "+he():"It answers in English, from our own information, and can book your consultation. Your browser will ask for the microphone.",N.textContent=t.note,N.hidden=!t.note,N.className="vnote"+(e==="error"?" bad":""),C.textContent=e==="live"?"End call":e==="connecting"?"Connecting\u2026":"Start call",C.className="call"+(e==="live"?" end":""),C.disabled=e==="connecting"}function r(){S.hidden=t.open,ie.hidden=!t.open,q.hidden=t.tab!=="chat",le.hidden=t.tab!=="voice";for(var e=0;e<f.length;e++){var o=f[e].dataset.tab===t.tab;f[e].className=o?"on":"",f[e].setAttribute("aria-selected",o?"true":"false")}y.querySelectorAll(".chips button").forEach(function(a){a.disabled=t.sending}),V.disabled=t.sending||!l.value.trim();var n=t.handover==="waiting"||t.handover==="live";U.hidden=n,l.placeholder=n?"Type your message\u2026":"Type your question\u2026",be(),ue(),D(),J()}function ue(){var e=S.querySelector(".unread");if(!t.unread){e&&e.remove();return}e||(e=document.createElement("span"),e.className="unread",S.appendChild(e)),e.textContent=String(t.unread),e.setAttribute("aria-label",t.unread+(t.unread===1?" new reply":" new replies"))}function he(){var e=Math.floor(t.secs/60),o=t.secs%60;return(e<10?"0":"")+e+":"+(o<10?"0":"")+o}function $(e){var o=(e||"").trim();if(!(!o||t.sending)){if(l.value="",t.msgs.push({role:"user",text:o}),t.handover==="waiting"||t.handover==="live"){r(),I(),fetch(Q,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:x,text:o,pageUrl:location.href})}).catch(function(){t.msgs.push({role:"system",text:"That message may not have reached us. If it is urgent, call "+d+"."}),r()}),l.focus();return}t.sending=!0,r(),fetch(K,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session_id:x,message:o,page_url:location.href})}).then(function(n){if(!n.ok)throw new Error(String(n.status));return n.json()}).then(function(n){t.msgs.push({role:"assistant",text:n.reply||"Sorry, could you put that another way?"})}).catch(function(){t.msgs.push({role:"assistant",text:"Sorry, I cannot reach our system right now. Please call "+d+" or email "+te+" and the team will pick it up."})}).then(function(){t.sending=!1,r(),l.focus(),W()})}}var E=null,T=!1;function fe(){return t.handover==="waiting"||t.handover==="live"?t.open?4e3:15e3:2e4}function z(){return ve().then(function(){T&&(clearTimeout(E),E=setTimeout(z,fe()))})}function I(){T||(T=!0,E=setTimeout(z,1200))}function W(){return I(),clearTimeout(E),z().then(r)}function ve(){return fetch(X,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:x,since:t.seenAt})}).then(function(e){return e.ok?e.json():null}).then(function(e){if(!(!e||!e.messages)){var o=t.handover;t.handover=e.handover||"none";var n=0;e.messages.forEach(function(a){a.at>t.seenAt&&(t.seenAt=a.at),!(a.role!=="human"&&a.role!=="system")&&(t.msgs.push({role:a.role,text:a.text}),a.role==="human"&&n++)}),n&&!t.open&&(t.unread+=n),(n||o!==t.handover)&&r()}}).catch(function(){})}function be(){var e=t.handover;if(B.hidden=e!=="waiting"&&e!=="live",!B.hidden){A.innerHTML="";var o=document.createElement("b");o.textContent=e==="live"?"You are talking to a person":"Getting a person for you";var n=document.createTextNode(e==="live"?"Replies here come from the Online Marketing Help team, not the assistant.":"Your question needs a person. Someone is being brought in. You can keep typing, or call "+d+" if it is urgent.");A.appendChild(o),A.appendChild(n)}}var v=null;function me(){if(v)return v;var e=Z;return v=import(e).then(function(o){var n=o&&(o.RetellWebClient||o.default&&o.default.RetellWebClient);if(!n)throw new Error("sdk");return n}),v.catch(function(){v=null}),v}function ge(){t.voice==="live"||t.voice==="connecting"||(t.voice="connecting",t.note="Connecting\u2026",r(),me().then(function(e){if(!e)throw new Error("sdk");return fetch(F,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session_id:x,page_url:location.href})}).then(function(o){return o.text().then(function(n){var a=null;try{a=n?JSON.parse(n):null}catch(s){}if(!o.ok||!a||!a.access_token)throw window.console&&console.warn&&console.warn("[OMH assistant] voice token: HTTP "+o.status+" "+(n?n.slice(0,300):"(empty body)")),new Error("token");return{Client:e,token:a.access_token}})})}).then(function(e){var o=new e.Client;return m=o,o.on("call_started",function(){t.voice="live",t.note="",clearInterval(g),t.secs=0,g=setInterval(function(){t.secs++,J()},1e3),r()}),o.on("call_ended",function(){t.voice="idle",t.note="Call ended.",clearInterval(g),r()}),o.on("error",function(){t.voice="error",t.note="The call dropped. Please try again or ring "+d+".",clearInterval(g);try{o.stopCall()}catch(n){}r()}),o.on("update",function(n){var a=n&&n.transcript,s=a&&a[a.length-1];if(!(!s||!s.content)){var p=s.role==="agent"?"assistant":"user",u=t.msgs[t.msgs.length-1];if(u&&u.role===p&&s.content.indexOf(u.text)===0)u.text=s.content;else{if(u&&u.role===p&&u.text===s.content)return;t.msgs.push({role:p,text:s.content})}D()}}),o.startCall({accessToken:e.token})}).catch(function(e){t.voice="error";var o=e&&(e.name==="NotAllowedError"||e.name==="NotFoundError"||e.name==="SecurityError");t.note=o?"Your browser blocked the microphone. Allow it for this site and try again, or ring "+d+".":e&&e.message==="sdk"?"The voice line could not load. Please use the Chat tab, or ring "+d+".":"The voice line is not available at the moment. Chat still works, or you can ring "+d+".",window.console&&console.warn&&console.warn("[OMH assistant] voice:",e),r()}))}function O(){try{m&&m.stopCall()}catch(e){}clearInterval(g),t.voice="idle",r()}S.addEventListener("click",function(){t.open=!0,t.unread=0,r(),l.focus(),T&&W()}),i(".x").addEventListener("click",function(){O(),t.open=!1,r()});for(var M=0;M<f.length;M++)f[M].addEventListener("click",function(){t.tab=this.dataset.tab,r(),t.tab==="chat"&&l.focus()});se.addEventListener("submit",function(e){e.preventDefault(),$(l.value)}),l.addEventListener("input",function(){V.disabled=t.sending||!l.value.trim()}),C.addEventListener("click",function(){t.voice==="live"?O():ge()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&t.open&&(O(),t.open=!1,r())}),window.addEventListener("pagehide",function(){try{m&&m.stopCall()}catch(e){}});function G(){document.body.appendChild(k),r(),Y&&I()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",G):G(),window.OhmAssistant={open:function(e){t.open=!0,(e==="voice"||e==="chat")&&(t.tab=e),r()},close:function(){O(),t.open=!1,r()},sessionId:function(){return x}}})();})();
