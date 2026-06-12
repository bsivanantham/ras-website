import { z } from "zod";

const PreviewSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("image"), src: z.string().min(1) }),
  z.object({ type: z.literal("pdf"), src: z.string().min(1) }),
  z.object({
    type: z.literal("event"),
    month: z.string().min(1),
    day: z.string().min(1),
    location: z.string().min(1),
  }),
]);

export const AnnouncementSchema = z.object({
  id: z.string().min(1),
  access: z.enum(["public", "member"]),
  badge: z.string().min(1).max(50),
  badgeColorKey: z.string().min(1),
  iconKey: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  date: z.string().min(1).max(100),
  href: z.string().nullable(),
  actionLabel: z.string().nullable(),
  done: z.boolean().optional(),
  preview: PreviewSchema,
  order: z.number(),
  createdAt: z.string(),
});

export const EventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  date: z.string().min(1).max(100),
  location: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  status: z.enum(["upcoming", "done"]),
});

export const ProviderSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  website: z.string().nullable(),
  websiteHref: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  phone2: z.string().nullable().optional(),
  email2: z.string().nullable().optional(),
});

export const PhotoSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1).max(200),
  caption: z.string().min(1).max(300),
  order: z.number(),
  uploadedAt: z.string(),
});
