import type { ReactNode } from "react"
import type { Post } from "@/lib/posts/schema"
import { TypeTag } from "@/components/hud/TypeTag"
import { relativeTime } from "@/lib/posts/relativeTime"

export function PostRow({ post, children }: { post: Post; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[56px_1fr] gap-4 border-t border-line py-5 first:border-t-0">
      <div className="text-right">
        <TypeTag type={post.type} />
        <div className="mt-1.5 font-mono text-[10px] text-text-muted">{relativeTime(post.date)}</div>
      </div>
      <div>{children}</div>
    </li>
  )
}
