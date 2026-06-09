import { z } from "zod"

const base = {
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).optional(),
}

export const buildSchema = z.object({
  ...base,
  type: z.enum(["build", "ship"]),
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["building", "active", "shipped"]),
  links: z
    .object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
      caseStudy: z.string().optional(),
    })
    .default({}),
  cover: z.string().optional(),
})

export const videoSchema = z.object({
  ...base,
  type: z.literal("video"),
  title: z.string().min(1),
  youtube: z.string().min(1),
  thumbnail: z.string().optional(),
})

export const igSchema = z.object({
  ...base,
  type: z.literal("post"),
  caption: z.string().min(1),
  image: z.string().min(1),
  permalink: z.string().url().optional(),
})

export const logSchema = z.object({
  ...base,
  type: z.literal("log"),
})

export const postFrontmatterSchema = z.discriminatedUnion("type", [buildSchema, videoSchema, igSchema, logSchema])

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>
export type PostType = PostFrontmatter["type"]
export type Post = PostFrontmatter & { id: string; body: string }
