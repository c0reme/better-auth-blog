import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/db/client";

export const auth = betterAuth({
  secret: import.meta.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      username: { type: "string", input: true, required: false },
    },
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    },
  },
});
