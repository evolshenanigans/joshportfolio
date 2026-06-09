import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["building", "active", "shipped"]).optional(),
  repo: z.string().url().optional(),
  cover: z.string().optional(),
})

export type ProjectMeta = z.infer<typeof projectSchema>

export interface Project {
  slug: string
  meta: ProjectMeta
  body: string
}
