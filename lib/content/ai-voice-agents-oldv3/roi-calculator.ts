// FROZEN BACKUP (oldv3): /ai-voice-agents as it was on 21 Oct 2026 (git tag oldv3), before the heading-changes v2 brief. Do not edit.
// ROI calculators from github.com/online-marketing-help/ohm-roi-calculators, copied as-is into
// public/roi-calculator/. Their HTML is generated: re-copy from the repo, never edit it here.
// The page scripts size the frame to its content (components/voice-agents/fitRoiFrames.ts);
// 1400px is only the starting height.

/** `page` is the calculator file name without .html, e.g. "dental", "real-estate", "any-business". */
export const roiCalculator = (page: string, cls = "bg-paper") => `<section id="roi-calculator" data-component="RoiCalculator" class="${cls}">
  <iframe src="/roi-calculator/${page}.html" title="ROI calculator" data-roi-frame
        style="width:100%;height:1400px;border:0"></iframe>
</section>`;
