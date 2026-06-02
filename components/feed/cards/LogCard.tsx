import type { Post } from "@/lib/posts/schema"

export function LogCard({ post }: { post: Extract<Post, { type: "log" }> }) {
  return <p className="text-sm leading-relaxed text-text">{post.body}</p>
}
