import { loadPosts } from "@/lib/posts/load"
import { Feed } from "@/components/feed/Feed"
import { CityHero } from "@/components/hero/CityHero"

export default function Home() {
  const posts = loadPosts()
  return (
    <main>
      <CityHero />
      <Feed posts={posts} />
    </main>
  )
}
