import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#05080a",
          color: "#eafcff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 90, fontWeight: 800, letterSpacing: 2 }}>WAHNAHBE</div>
        <div style={{ fontSize: 28, color: "#ffb020", marginTop: 12 }}>{site.tagline}</div>
      </div>
    ),
    { ...size },
  )
}
