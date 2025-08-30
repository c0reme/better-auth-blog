import { loginSchema, registerSchema, type Message } from "./lib/schema";
import { defineAsfAction } from "superforms:astro";
import { message } from "sveltekit-superforms";
import { db } from "./db/client";
import { auth } from "./auth";
import { signIn } from "./lib/auth-client";

// See https://astro-superforms.vercel.app/guides/shadcn-svelte/
export const server = {
  login: defineAsfAction({
    input: loginSchema,
    handler: async ({ email, password }, { form }) => {
      try {
        const data = await auth.api.signInEmail({
          body: { email, password },
        });

        if (!data) return message<Message>(form, "SUCCESS");
        return message<Message>(form, "NOT_FOUND");
      } catch (error: any) {
        return message<Message>(form, "BAD_REQUEST");
      }
    },
  }),
  register: defineAsfAction({
    input: registerSchema,
    handler: async ({ name, email, password }, { form }) => {
      try {
        const data = await auth.api.signUpEmail({
          body: { name, email, password, callbackURL: "/login" },
        });

        if (!data) return message<Message>(form, "SUCCESS");
        return message<Message>(form, "NOT_FOUND");
      } catch (error: any) {
        return message<Message>(form, "BAD_REQUEST");
      }
    },
  }),
};
