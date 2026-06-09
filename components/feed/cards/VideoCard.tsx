import type { Post } from "@/lib/posts/schema"

export function VideoCard({ post }: { post: Extract<Post, { type: "video" }> }) {
  const url = post.youtube.startsWith("http") ? post.youtube : `https://youtube.com/watch?v=${post.youtube}`
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block hover:[&_h3]:text-accent">
      <div className="relative mb-3 flex h-36 w-full items-center justify-center overflow-hidden rounded-md border border-line bg-surface-2 text-accent-2">
        <span className="font-mono text-2xl" aria-hidden>▶</span>
      </div>
      <h3 className="font-sans text-base font-semibold text-text">{post.title}</h3>
      <p className="mt-1 font-mono text-xs text-text-muted">YouTube</p>
    </a>
  )
}
