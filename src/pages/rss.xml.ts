import type { APIRoute } from "astro";
import rss from "@astrojs/rss";

export const GET: APIRoute = async ({ site }) => {
  const payload = {
    title: "Astro Blog",
    description: "Welcome to this multi-user blog!",
    site: site as string | URL,
  };

  const res = await fetch("/api/posts");
  if (!res.ok) return rss({ ...payload, items: [] } as any);

  const posts: any[] = await res.json();

  return rss({ ...payload, items: posts });
};
