import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as authSchema from "./auth-schema";
import * as appSchema from "./app-schema";

// See https://www.better-auth.com/docs/installation
const client = createClient({
  url: "file:db/sqlite.db",
  // url: import.meta.env.TURSO_DATABASE_URL,
  // authToken: import.meta.env.TURSO_AUTH_TOKEN
});

export const db = drizzle(client, { schema: { ...authSchema, ...appSchema } });
