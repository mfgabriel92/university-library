import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import config from "@/lib/config";

const client = neon(config.env.databaseUrl);
const db = drizzle({ client });

export { db };
