"use client"
import { useState } from "react"
import type { Post } from "@/lib/posts/schema"
import { filterPosts, type Filter } from "@/lib/posts/filter"
import { FilterChips } from "@/components/feed/FilterChips"
import { PostRow } from "@/components/feed/PostRow"
import { BuildCard } from "@/components/feed/cards/BuildCard"
import { VideoCard } from "@/components/feed/cards/VideoCard"
import { PostCard } from "@/components/feed/cards/PostCard"
import { LogCard } from "@/components/feed/cards/LogCard"

function Card({ post }: { post: Post }) {
  switch (post.type) {
    case "build":
    case "ship": return <BuildCard post={post} />
    case "video": return <VideoCard post={post} />
    case "post": return <PostCard post={post} />
    case "log": return <LogCard post={post} />
  }
}

export function Feed({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("All")
  const visible = filterPosts(posts, filter)
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <FilterChips active={filter} onChange={setFilter} />
      <ul>
        {visible.map((post) => (
          <PostRow key={post.id} post={post}><Card post={post} /></PostRow>
        ))}
      </ul>
    </section>
  )
}
