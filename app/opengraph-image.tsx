import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The link-preview card for every page (a nested segment can add its own). Without
// it, messengers fell back to whatever image they had cached for the domain from
// the old WordPress site.
// ponytail: built-in og font, not Instrument Sans — next/font fetches the brand
// font at build time and leaves no local file to hand to ImageResponse. Add a
// .ttf under assets/ if the preview typography ever needs to match exactly.
export const alt = "Online Marketing Help: full-service digital marketing agency for UK businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#000";
const AMBER = "#7d5c33";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        {/* 2063×526 source, scaled to 300 wide */}
        <img src={logoSrc} width={300} height={76} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 64, height: 6, background: AMBER, borderRadius: 3, marginBottom: 28 }} />
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 66, lineHeight: 1.08, maxWidth: 960 }}>
            <span>Full-service digital marketing agency for&nbsp;</span>
            <span style={{ color: AMBER }}>UK businesses</span>
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
          <span>Google Ads · Meta Ads · SEO · Websites</span>
          <span style={{ color: AMBER }}>onlinemarketinghelp.co.uk</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
