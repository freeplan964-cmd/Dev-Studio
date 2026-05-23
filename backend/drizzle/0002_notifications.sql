-- ============================================================
-- Migration: Notifications System
-- Table: notifications
-- ============================================================

CREATE TABLE IF NOT EXISTS "notifications" (
  "id"           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id"      TEXT        NOT NULL,
  "type"         TEXT        NOT NULL,
  "title"        TEXT        NOT NULL,
  "body"         TEXT,
  "entity_type"  TEXT,
  "entity_id"    UUID,
  "action_url"   TEXT,
  "is_read"      BOOLEAN     NOT NULL DEFAULT FALSE,
  "read_at"      TIMESTAMP,
  "metadata"     JSONB,
  "created_at"   TIMESTAMP   NOT NULL DEFAULT NOW(),
  "updated_at"   TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

-- 1. Unread badge count and unread-only feed
CREATE INDEX IF NOT EXISTS "idx_notifications_user_unread"
  ON "notifications" ("user_id", "is_read");

-- 2. Full paginated inbox, newest first
CREATE INDEX IF NOT EXISTS "idx_notifications_user_created"
  ON "notifications" ("user_id", "created_at" DESC);

-- 3. Filter by notification type for a specific user
CREATE INDEX IF NOT EXISTS "idx_notifications_user_type"
  ON "notifications" ("user_id", "type");

-- 4. All notifications linked to a specific resource
CREATE INDEX IF NOT EXISTS "idx_notifications_entity"
  ON "notifications" ("entity_type", "entity_id");

-- 5. Bulk cleanup of old read notifications (scheduled job)
CREATE INDEX IF NOT EXISTS "idx_notifications_read_created"
  ON "notifications" ("is_read", "created_at");

-- ============================================================
-- Row-Level Security
-- ============================================================

ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;

-- Users may only read their own notifications.
CREATE POLICY "notifications_select_own"
  ON "notifications"
  FOR SELECT
  USING (user_id = current_setting('app.current_user_id', TRUE));

-- Only the backend service role inserts notifications.
CREATE POLICY "notifications_insert_service"
  ON "notifications"
  FOR INSERT
  WITH CHECK (TRUE);

-- Users may mark their own notifications as read (UPDATE is_read, read_at only).
CREATE POLICY "notifications_update_own"
  ON "notifications"
  FOR UPDATE
  USING (user_id = current_setting('app.current_user_id', TRUE));

-- Users may dismiss (delete) their own notifications.
CREATE POLICY "notifications_delete_own"
  ON "notifications"
  FOR DELETE
  USING (user_id = current_setting('app.current_user_id', TRUE));
