"use client";

import { useEffect } from "react";
import { wireLeadDemo } from "./wireLeadDemo";

// The live demo section (lib/content/lead-demo.ts) on pages built on VoiceLanding: its suggested questions post
// into the demo frame. The old industry layout does the same from IndustryScript.
export function LeadDemoScript() {
  useEffect(() => {
    const hear = document.getElementById("hear");
    return hear ? wireLeadDemo(hear) : undefined;
  }, []);
  return null;
}
