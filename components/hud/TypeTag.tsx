import type { PostType } from "@/lib/posts/schema"

const LABEL: Record<PostType, string> = { build: "build", ship: "ship", video: "video", post: "post", log: "log" }
const COLOR: Record<PostType, string> = {
  build: "var(--tag-build)", ship: "var(--tag-ship)", video: "var(--tag-video)",
  post: "var(--tag-post)", log: "var(--tag-log)",
}

export function TypeTag({ type }: { type: PostType }) {
  return (
    <span className="inline-block rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
      style={{ color: COLOR[type], borderColor: "var(--line)" }}>
      {LABEL[type]}
    </span>
  )
}
