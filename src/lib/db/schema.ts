import { pgTable, timestamp, uuid, text, foreignKey, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
  url: text("url").notNull().unique(),
  userId: uuid("user_id").notNull()
}, (table) => [
  foreignKey({
    name: "userIdFk",
    columns:[table.userId],
    foreignColumns: [users.id]
  })
  .onDelete('cascade')
]);

export const feedFollows = pgTable("feed_follows", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: uuid("user_id").notNull(),
  feedId: uuid("feed_id").notNull()
}, (table) => [
  uniqueIndex("unique_user_feed_pair").on(table.userId, table.feedId),
  foreignKey({
    name: "usersIdFk",
    columns:[table.userId],
    foreignColumns: [users.id]
  })
  .onDelete('cascade'),
  foreignKey({
    name: "feedsIdFk",
    columns:[table.feedId],
    foreignColumns: [feeds.id]
  })
  .onDelete('cascade')
])