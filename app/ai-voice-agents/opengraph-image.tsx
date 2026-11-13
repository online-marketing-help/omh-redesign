import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The /ai-voice-agents share card (SEO brief Part 4): the site card's look, with the call the alt text describes.
export const alt = "OMH AI voice agent answering a customer call and booking an appointment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#000";
const AMBER = "#7d5c33";
const GREEN = "#7fd1a8";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const row = { display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 16 } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: INK,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#ffffff",
        }}
      >
        <img src={logoSrc} width={300} height={76} alt="" />

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
            <div style={{ width: 64, height: 6, background: AMBER, borderRadius: 3, marginBottom: 28 }} />
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 62, lineHeight: 1.08 }}>
              <span>AI voice agent for&nbsp;</span>
              <span style={{ color: AMBER }}>UK businesses</span>
            </div>
          </div>
          {/* The call: answered, then booked. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 470, fontSize: 26 }}>
            <div style={{ ...row, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)" }}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: GREEN }} />
              <span>Call answered on the first ring</span>
            </div>
            <div style={{ ...row, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.8)" }}>
              &ldquo;Would Saturday at 10am work?&rdquo;
            </div>
            <div style={{ ...row, background: AMBER, color: INK, fontWeight: 600 }}>Appointment booked: Sat 10:00</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 26,
            fontSize: 28,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>Answers · Books · Follows up, 24/7</span>
          <span style={{ color: AMBER }}>onlinemarketinghelp.co.uk</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
