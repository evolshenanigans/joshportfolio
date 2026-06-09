import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/posts/schema"

export function BuildCard({ post }: { post: Extract<Post, { type: "build" | "ship" }> }) {
  const href = post.links.caseStudy ? `/p/${post.links.caseStudy}` : post.links.repo ?? post.links.live
  const external = !post.links.caseStudy
  const Inner = (
    <>
      {post.cover && (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-md border border-line">
          <Image src={post.cover} alt="" fill className="object-cover opacity-90" sizes="(max-width:768px) 100vw, 768px" />
        </div>
      )}
      <h3 className="font-sans text-base font-semibold text-text">{post.title}</h3>
      <p className="mt-1 text-sm text-text-muted">{post.summary}</p>
      {post.tags && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-text-muted">{t}</span>
          ))}
        </div>
      )}
    </>
  )
  if (!href) return <div>{Inner}</div>
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:[&_h3]:text-accent">{Inner}</a>
  ) : (
    <Link href={href} className="block hover:[&_h3]:text-accent">{Inner}</Link>
  )
}
