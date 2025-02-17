import { config as dotenvConfig } from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenvConfig({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
