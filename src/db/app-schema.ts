import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import * as schema from "./auth-schema";
import { randomBytes } from "crypto";

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey().default(randomBytes(32).toString("hex")),
  slug: text("slug").notNull().unique(), // username.slug
  authorId: text("author_id")
    .notNull()
    .references(() => schema.user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  heroImage: text("hero_image"),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});
