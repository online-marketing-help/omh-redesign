// The one industry section with no counterpart on /ai-voice-agents, shared by the industry pages built on that
// layout (real estate, dental): a day of calls (chart). Each page passes its own content. Widget:
// components/voice-agents/LandingExtrasScript.tsx (chart switch). Styles: app/ai-voice-agents/voice-agents.css
// ("Real estate extras", now shared). "Your team" and "Getting ready" were removed on 21 Oct 2026 (client).

const icon = (name: string, cls = "") => `<svg class="icon${cls && " " + cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const eyebrow = (t: string) => `<p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>${t}</p>`;

/** hour label, calls, answered by the team, closed? */
export type Hour = [string, number, number, boolean?];
export type ExtrasCopy = {
  day: {
    eyebrow: string; h2: string; intro: string; hours: Hour[]; axis: number; aria: string;
    unit: string; // "branch", "practice": used in "Work out what it costs your …"
    moments: [string, string, string][];
  };
};

export function extrasMarkup({ day }: ExtrasCopy) {
  const total = day.hours.reduce((n, [, c]) => n + c, 0);
  const missed = day.hours.reduce((n, [, c, t]) => n + c - t, 0);
  const sumToday = `${total} calls, ${missed} missed (${Math.round((missed / total) * 100)}%). Hover or tap a bar for the hour.`;
  const sumAi = `${total} calls, 0 missed. Your AI agent picks up the ${missed} your team couldn't get to.`;
  const pct = (n: number) => `${((n / day.axis) * 100).toFixed(1)}%`;
  const col = ([h, calls, answered, closed]: Hour) => `          <li class="day-col${closed ? " is-closed" : ""}" data-tip="${h}:00${closed ? " (closed)" : ""} · ${calls} calls · ${calls - answered} missed">
            <span class="day-stack"><i class="day-m" style="height:${pct(calls - answered)}"></i><i class="day-t" style="height:${pct(answered)}"></i></span>
            <span class="day-h">${h}</span>
          </li>`;
  const moment = ([time, title, text]: [string, string, string]) => `        <li class="hover-card rounded-[16px] border border-line bg-paper p-5">
          <p class="flex items-baseline gap-3"><span class="font-display text-[22px] font-semibold text-hl tnum">${time}</span><span class="font-display text-[18px] font-semibold">${title}</span></p>
          <p class="mt-2 text-[16px] text-muted">${text}</p>
        </li>`;
  const radio = (mode: string, label: string, on: boolean) =>
    `<button type="button" role="radio" aria-checked="${on}" tabindex="${on ? 0 : -1}" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-day-mode="${mode}" data-track="industry_day_mode" data-track-name="${label}">${label}</button>`;

  const daySection = `
<section id="day" data-component="Day" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    ${eyebrow(day.eyebrow)}
    <h2>${day.h2}</h2>
    <p class="mt-5 text-muted">${day.intro}</p>
    <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start" data-day>
      <div class="hover-card rounded-[18px] border border-line bg-paper p-5 sm:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="font-display text-[18px] font-semibold">Calls by hour, one weekday</p>
          <div role="radiogroup" aria-label="Show the day" class="flex flex-wrap gap-2">${radio("today", "As it is today", true)}${radio("ai", "With an AI agent", false)}</div>
        </div>
        <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[15px] text-muted" aria-hidden="true">
          <li class="flex items-center gap-2"><i class="day-key day-key-t"></i>Answered by your team</li>
          <li class="flex items-center gap-2"><i class="day-key day-key-m"></i><span data-day-key>Missed</span></li>
        </ul>
        <div class="day-chart mt-5" data-day-chart data-mode="today" data-sum-today="${sumToday}" data-sum-ai="${sumAi}" role="img" aria-label="${day.aria}">
          <ol class="day-cols" style="grid-template-columns:repeat(${day.hours.length},minmax(0,1fr))">
${day.hours.map(col).join("\n")}
          </ol>
        </div>
        <p class="mt-4 text-[16px] font-semibold" aria-live="polite" data-day-sum>${sumToday}</p>
        <p class="mt-1 text-[15px] text-muted">Illustrative figures, not data from a real business. Your phone provider's call log shows your own pattern.</p>
      </div>
      <ol class="grid gap-3">
${day.moments.map(moment).join("\n")}
        <li><a href="#roi-calculator" class="text-link" data-track="industry_day_cost">Work out what it costs your ${day.unit}${icon("arrow-right")}</a></li>
      </ol>
    </div>
  </div>
</section>
`;

  return daySection;
}
