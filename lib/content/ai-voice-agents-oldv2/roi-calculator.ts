// FROZEN BACKUP (oldv2, 20 Oct 2026). Do not edit. Snapshot of /ai-voice-agents before the CRO rebuild; also tagged `oldv2` in git.
// ROI calculators from github.com/online-marketing-help/ohm-roi-calculators, copied as-is into
// public/roi-calculator/. Their HTML is generated: re-copy from the repo, never edit it here.
// The page scripts size the frame to its content (components/voice-agents/fitRoiFrames.ts);
// 1400px is only the starting height.

/** `page` is the calculator file name without .html, e.g. "dental", "real-estate", "any-business". */
export const roiCalculator = (page: string, cls = "bg-paper") => `<section id="roi-calculator" data-component="RoiCalculator" class="${cls}">
  <iframe src="/roi-calculator/${page}.html" title="ROI calculator" data-roi-frame
        style="width:100%;height:1400px;border:0"></iframe>
</section>`;
