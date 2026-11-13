// The "hear it before you buy it" section on the AI voice agent industry pages.
//
// It used to type a greeting into a phone mock and read it with the browser's
// speechSynthesis. That proved the voice existed and nothing else: a visitor
// could not ask it anything, and "ring our demo agency" was still [DEMO NUMBER].
// This replaces it with an assistant the visitor talks to as their own lead.
//
// The id stays `hear`: both hero buttons and the video section link to #hear.
//
// It embeds a working assistant for a fictional business in that trade, so a
// visitor can type their name, then chat or talk to it exactly as one of their
// own callers would. The demos are separate deployments with their own Retell
// agent, n8n workflows and knowledge base:
//   github.com/online-marketing-help/ohm-demo-real-estate
//   github.com/online-marketing-help/ohm-demo-healthcare
//
// It is an iframe, not the widget's own script, on purpose. OMH's assistant is
// pinned to the bottom right of every page by components/layout/SiteAssistant.
// Loading a second widget would put two pills side by side, and a fictional
// agency's fees would look like ours. Inside the frame the panel is docked,
// with no pill of its own (the demo's /embed.html, data-mount).
//
// The frame is cross-origin, so fitRoiFrames cannot measure it the way it
// measures the ROI calculators. The height is set here instead and is the one
// number to adjust if the panel ever outgrows it.

type Demo = {
  /** The demo deployment, without a trailing slash. */
  host: string;
  /** The fictional business inside the frame. */
  business: string;
  /** What the visitor is playing: "caller", "patient". */
  role: string;
  /** Three things worth asking, shown as prompts. */
  tries: string[];
  /** "an agency", "a clinic". Written out so the article is always right. */
  what: string;
  /** The refusal the second prompt triggers, in this trade's own words. */
  refusal: string;
};

export const leadDemos = {
  "real-estate": {
    host: "https://ohm-demo-real-estate.vercel.app",
    business: "Marlborough & Hale",
    role: "vendor ringing about a valuation",
    tries: [
      "What do you charge to sell my house?",
      "What's my house worth?",
      "Can I book a viewing on Saturday?",
    ],
    what: "an agency",
    refusal: "It will not put a price on your house: it says so and books the valuation instead",
  },
  healthcare: {
    host: "https://ohm-demo-healthcare.vercel.app",
    business: "Brookfield Clinic",
    role: "patient ringing to book",
    tries: [
      "How much is a first appointment?",
      "My blood test results are back, are they alright?",
      "Which insurers do you take?",
    ],
    what: "a clinic",
    refusal: "It will not read or interpret your results: it says so and gets a clinician to ring you",
  },
} satisfies Record<string, Demo>;

/**
 * The section. It sits on the dark band, the same treatment FinalCTA uses, so
 * the assistant reads as the object of the page rather than a widget bolted
 * into a column of text. The suggested questions are buttons: clicking one
 * posts it into the frame and the agent answers, which is the difference
 * between a demo and a list of things you could have typed.
 */
export const leadDemo = (key: keyof typeof leadDemos) => {
  const d = leadDemos[key];
  /* The middle one is the refusal, and it is the one worth pressing, so it is
     numbered like the others but carries a tag saying so. */
  const asks = d.tries
    .map(
      (t, i) =>
        `<button type="button" class="ld-ask${i === 1 ? " ld-ask-key" : ""}" data-ld-ask="${t.replace(/"/g, "&quot;")}" data-track="${key}_demo_ask">
          <span class="ld-n" aria-hidden="true">0${i + 1}</span>
          <span class="ld-q">${t}</span>
          ${i === 1 ? '<span class="ld-tag" aria-hidden="true">Try this one</span>' : ""}
        </button>`,
    )
    .join("");

  return `<section id="hear" data-component="HearIt" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>

  <div class="container-omh relative py-20 lg:py-28">
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center eyebrow-band"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Live demo</p>
      <h2>Be the caller. <span class="hl">Hear it answer.</span></h2>
      <p class="mx-auto mt-5 text-band-muted">
        A working agent, not a recording. Give it your name and ask it what one
        of your own leads would ask, by typing or out loud. It answers as
        ${d.business}, ${d.what} we invented so you can push it as hard as you like.
      </p>
    </div>

    <!-- Two columns only from 1280px. At the old lg (1024px) the prompt column
         held its 420px and the assistant was squeezed into 468px, so the thing
         the section exists for ended up smaller than the text beside it. -->
    <div class="ld-grid mt-12 grid gap-10 xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)] xl:items-start xl:gap-14">

      <div class="xl:pt-2">
        <p class="font-display text-[17px] font-semibold">Try one of these, as a ${d.role}</p>
        <div class="mt-4 grid gap-2.5" data-ld-asks>${asks}</div>
        <p class="mt-5 text-[15px] leading-relaxed text-band-muted">
          The middle one is the one to watch. ${d.refusal}, which is what you
          actually want an agent on your phone to do.
        </p>

        <dl class="ld-facts mt-9 grid gap-x-6 gap-y-5 border-t border-white/15 pt-7 grid-cols-2">
          <div><dt class="font-display text-[16px] font-semibold">Answers in two rings</dt><dd class="mt-1 text-[14.5px] text-band-muted">Any hour, many calls at once.</dd></div>
          <div><dt class="font-display text-[16px] font-semibold">Books while you talk</dt><dd class="mt-1 text-[14.5px] text-band-muted">Into the diary, not a message.</dd></div>
          <div><dt class="font-display text-[16px] font-semibold">Says when it cannot</dt><dd class="mt-1 text-[14.5px] text-band-muted">It hands over rather than guessing.</dd></div>
          <div><dt class="font-display text-[16px] font-semibold">Says it is an AI</dt><dd class="mt-1 text-[14.5px] text-band-muted">Asked outright, every time.</dd></div>
        </dl>
      </div>

      <div class="ld-stage">
        <div class="ld-frame">
          <span class="ld-live"><i aria-hidden="true"></i>Live now</span>
          <iframe
            src="${d.host}/embed.html"
            title="Talk to the ${d.business} assistant"
            loading="lazy"
            allow="microphone"
            data-ld-frame
            class="ld-iframe w-full"
          ></iframe>
        </div>
        <p class="mt-4 text-center text-[14px] text-band-muted">
          ${d.business} is not a real business and its number cannot ring anybody.
          Voice needs the microphone. Nothing is recorded.
        </p>
      </div>

    </div>
  </div>
</section>`;
};
