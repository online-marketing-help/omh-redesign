/* =========================================================================
   The calculator a business owner can actually use.

   Three questions, in the words they would use themselves:

     How many calls a month?   How many get missed?   What is a customer worth?

   Everything else has a sensible starting value and sits behind "Show the
   workings". The honest chain is still there, still editable, still sourced.
   It is just not the first thing a plumber is asked to understand.

   The sum underneath is unchanged:
     calls -> missed -> genuinely new business -> captured -> converted -> £
   ========================================================================= */

(function () {
  "use strict";

  const slug = window.OHM_INDUSTRY || "universal";
  const ind = INDUSTRIES[slug] || INDUSTRIES.universal;
  const $ = (s) => document.querySelector(s);
  const money = (n) => "£" + Math.round(n).toLocaleString("en-GB");
  const money2 = (n) =>
    "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const one = (w) => w.replace(/s$/, "");

  const state = Object.assign({}, ind.defaults, { mode: "overflow", plan: "auto" });

  let last = null;   /* the most recent result */

  /* ------------------------------------------------------------ the model */

  function model(v) {
    const missed = v.calls * (v.missedPct / 100);
    const newBiz = missed * (v.newPct / 100);
    const recovered = newBiz * (v.recoverPct / 100);
    const won = recovered * (v.convertPct / 100);
    const revenue = won * v.value;

    const handled = v.mode === "all" ? v.calls : missed;
    const minutes = handled * v.minutes;

    const auto = PLANS.find((p) => p.minutes >= minutes) || PLANS[PLANS.length - 1];
    const plan = v.plan === "auto" ? auto : PLANS.find((p) => p.id === v.plan);

    const over = Math.max(0, minutes - plan.minutes);
    const overCost = over * OVERAGE;
    const monthlyCost = plan.price + overCost;
    const net = revenue - monthlyCost;

    return {
      missed, newBiz, recovered, won, revenue, minutes, plan, over, overCost,
      monthlyCost, net,
      roi: monthlyCost > 0 ? revenue / monthlyCost : 0,
      payback: net > 0 ? plan.setup / net : Infinity,
      year1: net * 12 - plan.setup,
      breakeven: v.value > 0 ? monthlyCost / v.value : 0,
    };
  }

  /* --------------------------------------------------------- the 3 asks */
  /* Deliberately plain. No percentages in the main view: a count of calls is
     something an owner can picture, "48% miss rate" is not. */

  function buildMain() {
    const wrap = $("#asks");
    wrap.innerHTML = "";

    wrap.appendChild(ask({
      key: "calls",
      q: "How many phone calls do you get in a month?",
      hint: "A rough number is fine. Fifty a week is about 200 a month.",
      min: 20, max: 2000, step: 10,
      show: (v) => Math.round(v).toLocaleString("en-GB") + " calls",
      scale: (v) => Math.round(v).toLocaleString("en-GB"),
    }));

    wrap.appendChild(ask({
      key: "missedPct",
      q: "How many of those does nobody answer?",
      hint: "Out of hours, engaged, everyone busy. Most owners guess low, so check your phone bill if you can.",
      min: 0, max: 90, step: 1,
      show: (v) => Math.round(state.calls * v / 100).toLocaleString("en-GB") + " calls a month",
      scale: (v) => Math.round(v) + "%",
      sourced: true,
    }));

    wrap.appendChild(ask({
      key: "value",
      q: ind.askValue,
      hint: ind.valueHint,
      min: (ind.valueRange || {}).min || 50,
      max: (ind.valueRange || {}).max || 10000,
      step: (ind.valueRange || {}).step || 50,
      show: (v) => money(v),
      scale: (v) => v >= 1000 ? "£" + Math.round(v / 1000) + "k" : money(v),
      /* Only badge it where the figure is actually derived from something. A
         bare "our assumption" badge on every page is noise. */
      sourced: ind.valueSource && ind.valueSource !== "ours" ? ind.valueSource : null,
    }));
  }

  function ask(o) {
    const row = document.createElement("div");
    row.className = "ask";
    const id = "a-" + o.key;

    const q = document.createElement("label");
    q.className = "q";
    q.setAttribute("for", id);
    q.textContent = o.q;

    const out = document.createElement("div");
    out.className = "answer";
    out.id = "out-" + o.key;

    const input = document.createElement("input");
    input.type = "range";
    input.id = id;
    input.min = o.min; input.max = o.max; input.step = o.step;
    input.value = state[o.key];
    input.addEventListener("input", () => {
      state[o.key] = parseFloat(input.value);
      render();
    });

    /* The scale under the track, so the slider reads like a dial with a range
       rather than a bare line. */
    const scale = document.createElement("div");
    scale.className = "scale";
    const mid = o.min + (o.max - o.min) / 2;
    [o.min, mid, o.max].forEach(function (v) {
      const sp = document.createElement("span");
      sp.textContent = o.scale ? o.scale(v) : Math.round(v).toLocaleString("en-GB");
      scale.appendChild(sp);
    });

    /* The explanation and the source both go behind the mark next to the
       question rather than under the slider. See the tooltip note in
       style.css for why. */
    const inside = [];
    if (o.hint) {
      const hint = document.createElement("span");
      hint.className = "tip-hint";
      hint.textContent = o.hint;
      inside.push(hint);
    }

    const srcKey = o.sourced === true ? ind.missedSource : o.sourced;
    if (srcKey && SOURCES[srcKey]) {
      const s = SOURCES[srcKey];
      const p = document.createElement("span");
      p.className = "src " + s.grade;
      if (s.url) {
        p.append("We have started you at the figure reported by ");
        const a = document.createElement("a");
        a.href = s.url; a.target = "_blank"; a.rel = "noopener";
        a.textContent = s.label;
        p.appendChild(a);
        p.append(". Move it to what you know.");
      } else {
        p.append("Starting figure: " + s.label + ". Move it to what you know.");
      }
      inside.push(p);
    }

    appendTipInline(q, makeTip(inside));

    const head = document.createElement("div");
    head.className = "ask-head";
    head.append(q, out);

    row.append(head, input, scale);

    row.dataset.key = o.key;
    ASK_FORMAT[o.key] = o.show;
    return row;
  }
  const ASK_FORMAT = {};

  /* ------------------------------------------------------------ tooltips */

  /* A mark beside the question holding the explanation and the source.
     Hover opens it on a mouse, which is CSS; this adds the tap, because a
     phone has no hover and the text would otherwise be unreachable. */
  function closeTips(except) {
    document.querySelectorAll(".tip.open").forEach(function (t) {
      if (t === except) return;
      t.classList.remove("open");
      const b = t.querySelector(".tip-b");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  /* Keep the bubble inside the frame. It is centred on the mark by default,
     and pinned to whichever edge it would otherwise hang off. */
  function placeTip(wrap) {
    wrap.classList.remove("at-left", "at-right");
    const pop = wrap.querySelector(".tip-pop");
    if (!pop) return;
    const r = pop.getBoundingClientRect();
    const pad = 10;
    if (r.left < pad) wrap.classList.add("at-left");
    else if (r.right > window.innerWidth - pad) wrap.classList.add("at-right");
    /* The tail follows the mark when the bubble is pinned. */
    const b = wrap.querySelector(".tip-b").getBoundingClientRect();
    const now = pop.getBoundingClientRect();
    pop.style.setProperty("--tail", (b.left + b.width / 2 - now.left) + "px");
  }

  /* Put the mark on the same line as the last word of the question. Appended
     plainly it wraps on its own onto the next line whenever the question
     fills the column, which reads as a stray dot under the text. */
  function appendTipInline(el, tip) {
    if (!tip) return;
    /* The whole question is the target, not just the 17px mark: people aim at
       the words they are reading. The mark stays as the thing that says there
       is something to read. */
    el.classList.add("has-tip");
    el.addEventListener("mouseenter", function () { placeTip(tip); });
    const last = el.lastChild;
    if (last && last.nodeType === 3 && /\S\s*$/.test(last.nodeValue)) {
      const text = last.nodeValue.replace(/\s+$/, "");
      const cut = text.lastIndexOf(" ");
      const keep = cut === -1 ? "" : text.slice(0, cut + 1);
      const word = cut === -1 ? text : text.slice(cut + 1);
      const tail = document.createElement("span");
      tail.className = "nowrap";
      tail.textContent = word;
      tail.appendChild(tip);
      last.nodeValue = keep;
      el.appendChild(tail);
      return;
    }
    el.appendChild(tip);
  }

  let tipsWired = false;
  function makeTip(nodes) {
    if (!nodes.length) return null;

    const wrap = document.createElement("span");
    wrap.className = "tip";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tip-b";
    btn.setAttribute("aria-label", "Why we ask this, and where the figure comes from");
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "i";

    const pop = document.createElement("span");
    pop.className = "tip-pop";
    pop.setAttribute("role", "tooltip");
    nodes.forEach(function (n) { pop.appendChild(n); });

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const open = !wrap.classList.contains("open");
      closeTips(wrap);
      wrap.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) placeTip(wrap);
    });
    wrap.addEventListener("mouseenter", function () { placeTip(wrap); });
    btn.addEventListener("focus", function () { placeTip(wrap); });

    wrap.append(btn, pop);

    if (!tipsWired) {
      tipsWired = true;
      document.addEventListener("click", function () { closeTips(null); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeTips(null);
      });
    }
    return wrap;
  }

  /* ------------------------------------------------------- the workings */

  const DETAIL = [
    { k: "newPct", label: "Of the missed calls, how many are new business",
      min: 5, max: 100, step: 1, suffix: "%",
      help: "Your call log is not all customers. Suppliers, people you already work with, wrong numbers and sales calls are all in there." },
    { k: "recoverPct", label: "How many of those the agent handles well enough to capture",
      min: 10, max: 100, step: 1, suffix: "%",
      help: "Some callers will always want a person, and some ask for something the agent is not set up for." },
    { k: "convertPct", label: "How many captured enquiries become paying work",
      min: 1, max: 100, step: 1, suffix: "%",
      help: "Your own closing rate. The agent books them in; you still have to win them." },
    { k: "minutes", label: "Average length of a call", min: 1, max: 15, step: 0.5, suffix: " min",
      help: "Only used to size the plan, not the money." },
  ];

  function buildDetail() {
    const wrap = $("#detail-fields");
    wrap.innerHTML = "";
    DETAIL.forEach((f) => {
      const row = document.createElement("div");
      row.className = "field";
      row.dataset.k = f.k;
      row.dataset.suffix = f.suffix;

      const head = document.createElement("div");
      head.className = "field-head";
      const l = document.createElement("label");
      l.setAttribute("for", "d-" + f.k);
      l.textContent = f.label;
      const help = document.createElement("span");
      help.className = "tip-hint";
      help.textContent = f.help;
      appendTipInline(l, makeTip([help]));
      const o = document.createElement("output");
      head.append(l, o);

      const i = document.createElement("input");
      i.type = "range"; i.id = "d-" + f.k;
      i.min = f.min; i.max = f.max; i.step = f.step; i.value = state[f.k];
      i.addEventListener("input", () => { state[f.k] = parseFloat(i.value); render(); });

      row.append(head, i);
      wrap.appendChild(row);
    });
  }

  /* --------------------------------------------------------------- render */

  function render() {
    const r = model(state);
    last = r;

    Object.keys(ASK_FORMAT).forEach((k) => {
      const el = document.getElementById("out-" + k);
      if (el) el.textContent = ASK_FORMAT[k](state[k]);
    });

    document.querySelectorAll("#detail-fields .field").forEach((row) => {
      const k = row.dataset.k;
      row.querySelector("output").textContent =
        (k === "minutes" ? state[k].toFixed(1) : Math.round(state[k])) + row.dataset.suffix;
    });

    /* The headline figure, with a sentence under it saying where it came from.
       It used to read "3 customers x £900 - £449 cost", which asked the reader
       to do the sum and then failed it: the model works on 3.19 customers and
       the line rounded that to 3, so the arithmetic on screen did not reach
       the number above it. This says the same thing in words, keeps "about"
       in front of the rounded count, and quotes the two money figures that do
       reconcile. */
    const wonN = r.won >= 2 ? Math.round(r.won) : Math.round(r.won * 10) / 10;
    const unit = wonN === 1 ? one(ind.unit) : ind.unit;
    $("#verdict-num").textContent = (r.net < 0 ? "-" : "+") + money(Math.abs(r.net));
    $("#verdict-num").className = r.net > 0 ? "good" : "bad";
    $("#verdict-sum").textContent =
      "Win back about " + wonN.toLocaleString("en-GB") + " " + unit +
      " a month from calls nobody answers, worth " + money(r.revenue) +
      ", less the " + money(r.monthlyCost) + " the agent costs.";
    document.querySelector(".hero-fig .cap").textContent =
      r.net < 0 ? "What it would cost you, every month" : "Better off, every month";

    $("#lost").textContent = money(r.revenue);
    $("#lostsub").textContent =
      "about " + wonN.toLocaleString("en-GB") + " " +
      (wonN === 1 ? one(ind.unit) : ind.unit) + " a month";

    const answered = Math.round((state.mode === "all" ? state.calls : r.missed) * 12);
    $("#answered").textContent = answered.toLocaleString("en-GB");
    $("#answeredsub").textContent = state.mode === "all"
      ? "every call that comes in" : "that nobody picks up today";

    /* The reframe that does the work in a sales conversation: forget the model,
       what is the least that has to happen? Where one customer already covers
       the fee, say so as a multiple. Where it does not, say how many do, rather
       than printing a limp "0.9x" and hoping nobody reads it. */
    if (state.value >= r.monthlyCost) {
      $("#minimum-cap").textContent = "Win just 1 " + one(ind.unit) + " a month and it is";
      $("#minimum-roi").textContent = (state.value / r.monthlyCost).toFixed(1) + "x back";
      $("#minimum-roi").className = "good";
    } else {
      const need = r.breakeven;
      const n = need < 2 ? need.toFixed(1) : String(Math.ceil(need));
      $("#minimum-cap").textContent = "It has paid for itself the moment you win";
      $("#minimum-roi").textContent =
        n + " " + (parseFloat(n) <= 1.05 ? one(ind.unit) : ind.unit) + " a month";
      $("#minimum-roi").className = "good";
    }

    $("#price").textContent = money(r.monthlyCost);
    $("#pricesub").textContent = r.over > 0
      ? r.plan.name + " plus " + money2(r.overCost) + " of minutes"
      : r.plan.name + ", " + money(r.plan.setup) + " to set up";

    document.querySelectorAll("#segments button").forEach((b) => {
      b.classList.toggle("on", b.dataset.plan === r.plan.id);
    });
    $("#plan-note").textContent =
      r.plan.blurb + " Live in " + r.plan.delivery + ".";

    $("#payback").textContent =
      r.payback === Infinity ? "not at these numbers"
        : r.payback < 1 ? "under a month" : r.payback.toFixed(1) + " months";
    $("#year1").textContent = (r.year1 < 0 ? "-" : "") + money(Math.abs(r.year1));
    $("#year1").className = r.year1 > 0 ? "good" : "bad";
    /* The old "pays for itself at N customers" line now lives in the
       highlight card, phrased as the minimum case rather than a threshold. */

    /* workings */
    $("#chain").innerHTML = "";
    [
      [Math.round(state.calls), "calls a month"],
      [Math.round(r.missed), "nobody answers"],
      [Math.round(r.newBiz), "of those are new business"],
      [Math.round(r.recovered), "the agent captures"],
      [Math.round(r.won), ind.unit + " won, at " + money(state.value) + " each"],
    ].forEach(([n, t]) => {
      const li = document.createElement("li");
      li.innerHTML = "<b>" + n.toLocaleString("en-GB") + "</b> " + t;
      $("#chain").appendChild(li);
    });

    $("#plan-name").textContent = r.plan.name;
    $("#plan-line").textContent =
      money(r.plan.price) + " a month, " + r.plan.minutes.toLocaleString("en-GB") +
      " minutes, " + money(r.plan.setup) + " setup, live in " + r.plan.delivery + ".";
    $("#plan-blurb").textContent = r.plan.blurb;
    const bar = $("#minbar");
    bar.style.width = Math.min(100, (r.minutes / r.plan.minutes) * 100) + "%";
    bar.className = r.over > 0 ? "over" : "";
    $("#minutes").textContent = Math.round(r.minutes).toLocaleString("en-GB");
    $("#over").textContent = r.over > 0
      ? Math.round(r.over).toLocaleString("en-GB") + " over, at " + Math.round(OVERAGE * 100) + "p a minute"
      : Math.round(r.plan.minutes - r.minutes).toLocaleString("en-GB") + " spare";
    $("#mode-note").textContent = state.mode === "all"
      ? "Sized for answering every call that comes in."
      : "Sized for picking up only what your team misses.";
  }

  /* ----------------------------------------------------------------- boot */

  function boot() {
    $("#headline").textContent = ind.headline;
    $("#lede").textContent = ind.lede;

    const toggle = $("#show-workings");
    const panel = $("#workings");
    toggle.addEventListener("click", () => {
      const open = panel.hasAttribute("hidden");
      if (open) panel.removeAttribute("hidden"); else panel.setAttribute("hidden", "");
      toggle.textContent = open ? "Hide the workings" : "Show me how you worked that out";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.querySelectorAll("[data-mode]").forEach((b) => {
      b.addEventListener("click", () => {
        state.mode = b.dataset.mode;
        document.querySelectorAll("[data-mode]").forEach((x) => x.classList.toggle("on", x === b));
        render();
      });
    });

    /* Plans as segments, the way a visitor expects to pick one. "auto" is the
       default and simply highlights whichever one their minutes land in. */
    const segs = $("#segments");
    PLANS.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.plan = p.id;
      b.textContent = p.name;
      b.addEventListener("click", () => {
        state.plan = state.plan === p.id ? "auto" : p.id;
        render();
      });
      segs.appendChild(b);
    });

    $("#reset").addEventListener("click", () => {
      Object.assign(state, ind.defaults, { mode: "overflow", plan: "auto" });
      document.querySelectorAll("[data-mode]").forEach((x) =>
        x.classList.toggle("on", x.dataset.mode === "overflow"));
      buildMain(); buildDetail(); render();
    });

    const notes = $("#notes");
    ind.notes.forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      notes.appendChild(li);
    });

    buildMain();
    buildDetail();
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
