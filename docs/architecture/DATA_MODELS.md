# 💾 Database Schema and Data Models

> [!NOTE]
> Dev Studio utilizes Drizzle ORM to define, migrate, and query PostgreSQL tables. The schemas are split into modular files under **`backend/src/domain/schema/`** to optimize maintenance and build performance.

---

## 📂 Schema File Map

All database tables are defined in standard Drizzle format inside:
- `backend/src/domain/schema/auth.ts` — User profiles and verification states.
- `backend/src/domain/schema/core.ts` — Prompts, agents, templates, components, and snippets.
- `backend/src/domain/schema/learning.ts` — Interview questions and progress tracking.

---

## 👥 Authentication Models

### 📍 `auth_users`
Stores user profile credentials, Google OAuth logins, and validation states.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default Random | Unique identifier. |
| `email` | `text` | Unique, Index | User's email address. |
| `password_hash` | `text` | Nullable | Encrypted password string. Null for Google OAuth accounts. |
| `google_id` | `text` | Unique, Nullable | Google OAuth identifier. |
| `display_name` | `text` | Nullable | Profile name displayed in dashboard views. |
| `avatar_url` | `text` | Nullable | URL to user's profile image. |
| `is_verified` | `boolean` | Not Null, Default `false` | Email verification flag. |
| `verification_token` | `text` | Nullable | Temporary token for email activation. |
| `verification_token_expires`| `timestamp` | Nullable | Expiry date of active verification token. |
| `created_at` | `timestamp` | Not Null, Default Now | Creation timestamp. |
| `updated_at` | `timestamp` | Not Null, Default Now | Last update timestamp. |
| `deleted_at` | `timestamp` | Nullable | Soft delete timestamp. |

---

## 🛠️ Core Business Models

### 📍 `prompts`
Maintains user prompt libraries, parameter lists, and favorite markers.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default Random | Unique identifier. |
| `user_id` | `text` | Not Null, Index | ID of the owning user. |
| `title` | `text` | Not Null | Prompt display title. |
| `description` | `text` | Nullable | Long description of the prompt. |
| `body` | `text` | Not Null | The actual prompt template text. |
| `variables` | `text[]` | Default `[]` | Parsed template variables (e.g. `['topic', 'length']`). |
| `category` | `text` | Nullable | Categorization label. |
| `tags` | `text[]` | Default `[]` | Searchable tag labels. |
| `favorite` | `boolean` | Default `false` | Pin flag. |
| `usage_count` | `integer` | Default `0` | Number of times consumed. |
| `versions` | `jsonb` | Default `[]` | Revision log history containing old body states. |

### 📍 `agents`
Stores system configuration parameters for custom AI Agents.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default Random | Unique identifier. |
| `user_id` | `text` | Not Null, Index | Owning user ID. |
| `name` | `text` | Not Null | Agent profile name. |
| `role` | `text` | Nullable | The agent's core role description. |
| `system_prompt` | `text` | Not Null | Custom instructions injected into system role context. |
| `tools` | `text[]` | Default `[]` | Enabled integrations or runtime utility handlers. |
| `model` | `text` | Nullable | Selected AI engine model (e.g. `gpt-4o`, `gpt-3.5-turbo`). |
| `temperature` | `real` | Default `0.7` | Model response creativity temperature settings. |
| `status` | `text` | Default `draft` | Active state: `draft`, `active`, or `archived`. |

### 📍 `components`
Stores reusable frontend React code snippets and metadata.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default Random | Unique identifier. |
| `user_id` | `text` | Not Null, Index | Owning user ID. |
| `name` | `text` | Not Null | Component title. |
| `code` | `text` | Not Null | The source JSX/TSX React code. |
| `dependencies` | `text[]` | Default `[]` | Required packages to run (e.g., `lucide-react`). |
| `favorite` | `boolean` | Default `false` | Pin flag. |

---

## 🧠 Interview & Learning Prep Models

### 📍 `interview_questions`
Stores interview preparation questions, answers, and depth states.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Default Random | Unique identifier. |
| `user_id` | `text` | Nullable, Index | ID of the creator. Null for global seed questions. |
| `question` | `text` | Not Null | The query string. |
| `answer` | `text` | Not Null | Detailed baseline answer explanation. |
| `difficulty` | `enum` | Default `mid` | Enum: `junior`, `mid`, `senior`. |
| `area` | `enum` | Not Null | Category Enum: `frontend`, `backend`, `devops`, `database`. |
| `answer_depths` | `jsonb` | Default `[]` | Graduated response depths (e.g., summary, detailed, advanced). |
| `is_global` | `boolean` | Default `false`, Index | Set to `true` for standard system seed questions. |

### 📍 `user_progress`
Tracks user completion status across prep questions and tech roadmaps.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | `text` | Not Null | Owning user identifier. |
| `item_id` | `text` | Not Null | ID of the related item. |
| `area_id` | `text` | Not Null | Category identifier (for easy aggregation). |
| `completed` | `boolean` | Default `true` | Progress completion flag. |
| `updated_at` | `timestamp` | Not Null, Default Now | Update timestamp. |

> [!NOTE]
> The primary key for `user_progress` is composed of `(user_id, item_id)` to prevent double tracking records.
