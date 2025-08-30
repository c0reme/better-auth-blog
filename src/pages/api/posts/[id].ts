import type { APIRoute } from "astro";
import { db } from "~/db/client";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) return new Response("Bad request", { status: 400 });

  const post = await db.query.posts.findFirst({
    where: (p, { eq }) => eq(p.id, id),
  });

  if (!post) return new Response("Not found", { status: 404 });

  const { authorId, ...data } = post;

  const author = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.id, authorId),
  });

  return Response.json({
    ...data,
    username: author?.username ?? "unknown",
  });
};
