import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./src/db/app-schema.ts", "./src/db/auth-schema.ts"],
  dialect: "sqlite",
  out: "./db/drizzle",
  dbCredentials: {
    url: "file:db/sqlite.db",
  },
});
