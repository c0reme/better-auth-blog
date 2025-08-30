import { auth } from "~/auth";
import type { APIRoute } from "astro";

// See https://www.better-auth.com/docs/integrations/astro#mount-the-handler
export const ALL: APIRoute = async ({ clientAddress, request }) => {
  request.headers.set("x-forwarded-for", clientAddress);
  return auth.handler(request);
};
