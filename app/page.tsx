import { loadPosts } from "@/lib/posts/load"
import { Feed } from "@/components/feed/Feed"

export default function Home() {
  const posts = loadPosts()
  return (
    <main className="pt-14">
      <section className="mx-auto max-w-3xl px-5 pt-16 pb-8">
        <h1 className="font-mono text-2xl font-bold tracking-wide text-text" style={{ textShadow: "0 0 12px var(--glow-cyan)" }}>
          WAHNAHBE <span className="text-accent-2 text-base">ワナビー</span>
        </h1>
        <p className="mt-2 text-sm text-text-muted">Fun, useful AI — built &amp; explained in public.</p>
      </section>
      <Feed posts={posts} />
    </main>
  )
}
