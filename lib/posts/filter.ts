import type { Post } from "@/lib/posts/schema"

export const FILTERS = ["All", "Projects", "Videos", "Posts", "Logs"] as const
export type Filter = (typeof FILTERS)[number]

const MATCH: Record<Filter, (p: Post) => boolean> = {
  All: () => true,
  Projects: (p) => p.type === "build" || p.type === "ship",
  Videos: (p) => p.type === "video",
  Posts: (p) => p.type === "post",
  Logs: (p) => p.type === "log",
}

export function filterPosts(posts: readonly Post[], filter: Filter): readonly Post[] {
  return posts.filter(MATCH[filter])
}
