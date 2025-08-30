import type { APIRoute } from "astro";
import { db } from "~/db/client";
import { posts } from "~/db/app-schema";
import { user } from "~/db/auth-schema";

export const GET: APIRoute = async ({ locals, request }) => {
  try {
    const data = await db.select().from(posts);

    return Response.json(data);
  } catch (error: any) {
    return new Response(error.message ?? "Internal error");
  }
};

export const POST: APIRoute = async ({ locals, request }) => {
  if (!locals.user) return new Response("Unauthorized", { status: 401 });

  try {
    const { username, slug, title, content } = await request.json();

    await db.insert(posts).values({
      slug: `${username}/${slug}`,
      title,
      content,
      authorId: locals.user.id,
    });

    return new Response("Success", { status: 200 });
  } catch (error: any) {
    return new Response(error.message ?? "Internal error");
  }
};
