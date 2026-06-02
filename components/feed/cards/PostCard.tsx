import Image from "next/image"
import type { Post } from "@/lib/posts/schema"

export function PostCard({ post }: { post: Extract<Post, { type: "post" }> }) {
  const body = (
    <>
      <div className="relative mb-3 h-64 w-full overflow-hidden rounded-md border border-line">
        <Image src={post.image} alt={post.caption} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
      </div>
      <p className="text-sm text-text">{post.caption}</p>
      <p className="mt-1 font-mono text-xs text-text-muted">Instagram</p>
    </>
  )
  return post.permalink ? (
    <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">{body}</a>
  ) : <div>{body}</div>
}
