import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const UserStatus = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const UserRoles = pgEnum("role", ["USER", "ADMIN"]);
export const BorrowStatus = pgEnum("borrow_status", ["BORROWED", "REJECTED"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  universityId: integer("university_id").notNull().unique(),
  universityCard: text("university_card").notNull(),
  status: UserStatus("status").default("PENDING"),
  role: UserRoles("role").default("USER"),
  lastActivityAt: date("last_activity_at").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
