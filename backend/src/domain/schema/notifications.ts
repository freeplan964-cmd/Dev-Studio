import {
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { NotificationType, ActivityEntityType } from "../enums.js";

/**
 * notifications
 *
 * Per-user alert inbox. Supports read/unread state, typed categories,
 * optional deep-link routing, and soft metadata for rich rendering.
 *
 * Rows are never hard-deleted by the server — users may dismiss (DELETE)
 * their own rows. The server only INSERTs.
 *
 * Query patterns optimised by indexes:
 *   1. Unread badge count / unread feed    → idx_notifications_user_unread
 *   2. Full paginated inbox (newest first) → idx_notifications_user_created
 *   3. Filter by notification type         → idx_notifications_user_type
 *   4. Notifications for a specific entity → idx_notifications_entity
 *   5. Bulk cleanup of old read notifs     → idx_notifications_read_created
 */
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: text("user_id").notNull(),

    type: text("type").$type<NotificationType>().notNull(),

    title: text("title").notNull(),

    body: text("body"),

    entityType: text("entity_type").$type<ActivityEntityType>(),

    entityId: uuid("entity_id"),

    actionUrl: text("action_url"),

    isRead: boolean("is_read").default(false).notNull(),

    readAt: timestamp("read_at"),

    metadata: jsonb("metadata").$type<Record<string, unknown>>(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("idx_notifications_user_unread").on(t.userId, t.isRead),

    index("idx_notifications_user_created").on(t.userId, t.createdAt),

    index("idx_notifications_user_type").on(t.userId, t.type),

    index("idx_notifications_entity").on(t.entityType, t.entityId),

    index("idx_notifications_read_created").on(t.isRead, t.createdAt),
  ],
);

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
