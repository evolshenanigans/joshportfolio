import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Joshua Gutierrez — Data Scientist by training. Translator by trade."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0b0d",
          color: "#f4f1ea",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            letterSpacing: 8,
            color: "#8a8a92",
          }}
        >
          Joshua Gutierrez — Portfolio 2026
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.0,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Data scientist by training.</span>
          <span style={{ color: "#ff5436" }}>Translator by trade.</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#8a8a92",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>MS Data Science · Boston University</span>
          <span>joshgusgutierrez@gmail.com</span>
        </div>
      </div>
    ),
    size,
  )
}
