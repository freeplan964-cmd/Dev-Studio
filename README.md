# 🌌 Dev Studio

> **Your ultimate personal AI-powered development hub.** Dev Studio provides a centralized, local-first control center to organize, version, test, and instantly run prompts, AI agents, React components, snippets, project templates, and technical interview preparation.

---

## ✨ Features

- 📝 **Prompts** — A robust library with parameters, template variable parser, favorite tags, and visual version history.
- 🤖 **AI Agents** — Custom AI agents with customizable system instructions, model selection, temperature control, and custom tools.
- 🧩 **React Components** — Reusable code blocks with automatic dependency mapping, styling configurations, and utility metadata.
- 📦 **Templates** — Standard software project structures complete with dynamic technology stack descriptors and structural layouts.
- 📎 **Snippets** — Multilingual code snippets organized with smart language filters, searchable descriptions, and syntax highlighting.
- 🧠 **Interview Prep** — A structured learning library and Q&A bank categorized by tech areas (frontend, backend, DevOps, databases) and difficulty levels.
- 🛡️ **Tech Skills Checklist** — Detailed interactive lists to track your career progression across key software engineering domains.
- 👥 **Soft Skills Track** — A curated communication module focusing on active listening, problem-solving, and collaboration.
- 📢 **Social & Email Drafts** — Ready-to-go post copy and email templates for major channels with token substitution.

---

## 🛠️ The Tech Stack

Dev Studio is structured as a monorepo containing a React frontend and an Express backend.

| Layer | Component | Description |
| :--- | :--- | :--- |
| 🎨 **Frontend** | **React 19** | Custom components with modern hooks and fast reconciliation |
| 🔀 **Routing** | **TanStack Router** | Strongly typed, file-based routing architecture |
| 🔄 **Querying** | **TanStack Query** | State-of-the-art async data fetching and state caching |
| 💾 **State** | **Zustand** | Lightweight, responsive state store synchronized with local storage |
| 💅 **Styling** | **Tailwind CSS v4** | CSS-first configuration and atomic component classes |
| 🏗️ **UI Kit** | **shadcn/ui** | Clean, responsive component library |
| ⚙️ **Backend** | **Express 5** | High-performance HTTP server built using Clean Architecture |
| 🔄 **Hot Reloading** | **Nodemon + tsx** | Automatic server restarts on typescript files change (ignoring markdown/docs) |
| ⚡ **ORM** | **Drizzle ORM** | Strictly-typed database queries and migrations |
| 🗄️ **Database** | **PostgreSQL** | Local persistence supporting active connection pooling |
| 🛠️ **Build System** | **Vite** | Fast local compilation and dynamic Hot Module Replacement (HMR) |
| 🛡️ **Language** | **TypeScript** | 100% strict type safety across the entire repository |

---

## 🚀 Quick Local Setup

Dev Studio runs fully in your local workspace. Below is a quick start guide.

### 1. Install Dependencies
Install all required modules from the workspace root:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the **`backend/`** directory (not the root) containing:
```ini
PORT=5000
JWT_SECRET=super_secret_session_jwt_key_here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dev_studio_db
OPENAI_API_KEY=your_openai_api_key_here
```
*(For a deep-dive on credentials and optional settings, refer to the [Environment Variables Guide](./docs/setup/ENVIRONMENT.md).)*

### 3. Initialize Database Schema
Push tables to your local PostgreSQL instance and seed the initial data:
```bash
# Push database schemas
npm run db:push --prefix backend

# Seed starter questions and templates
npm run db:seed --prefix backend
```

### 4. Run the Application
Start both the backend server and the frontend development environment:
```bash
# In Terminal 1: Run Backend (reloads on changes using nodemon)
npm run dev:backend

# In Terminal 2: Run Frontend (reloads via Vite)
npm run dev:frontend
```
Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)** (or the port specified by Vite).

---

## 🐋 Running with Docker Compose (Containerized Development)

You can launch the entire stack—including the React frontend, Express backend, and PostgreSQL database—with a single command:

```bash
# Start all services (db, backend, frontend) in the background
docker compose up --build -d
```

Once built and running:
- **Frontend client** is available at: **[http://localhost:5173](http://localhost:5173)**
- **Backend API server** is available at: **[http://localhost:5000](http://localhost:5000)**
- **PostgreSQL Database** is running on: `localhost:5432`

To run database migrations and seed default prep resources within the container environment:
```bash
# Push tables to the Postgres container
docker compose exec backend npm run db:push

# Run seed scripts
docker compose exec backend npm run db:seed
```

To stop the containers:
```bash
docker compose down
```

---

## 📂 Monorepo Organization

The project is structured to keep application concerns clean and separated:

```
Dev-Studio/
├── backend/            # Express 5 Backend (Clean Architecture)
│   ├── src/
│   │   ├── domain/     # Entities, schemas, repository interfaces
│   │   ├── application/# Use cases and domain service logic
│   │   ├── infrastructure/ # Database connection, migrations, seeding
│   │   └── presentation/# Controllers, Express routes, and middlewares
│   └── nodemon.json    # Hot reload watch config
├── frontend/           # React 19 Frontend (Vite SPA)
│   ├── src/
│   │   ├── components/ # Presentation UI components (shadcn/ui)
│   │   ├── routes/     # TanStack Router layouts and pages
│   │   └── lib/        # Zustand stores and API services
│   └── vite.config.ts  # Vite build configuration
└── docs/               # Technical Guides and Architectural Specs
```

---

## 📖 Deep-Dive Documentation

Learn more about Dev Studio's architecture, setup, integrations, and contributing guidelines under the `docs/` folder:

- ⚙️ [Setup & Commands](./docs/setup/README.md) — Prerequisites, full scripts list, and local workspace setup.
- 📐 [System Architecture](./docs/architecture/README.md) — In-depth overview of application boundaries and clean architecture.
- 💾 [Data Models & Schema](./docs/architecture/DATA_MODELS.md) — Drizzle schema properties, relations, and database design.
- 🌐 [Environment Variables](./docs/setup/ENVIRONMENT.md) — Reference table for all environment configurations.
- 🔑 [API Credentials Setup](./docs/setup/CREDENTIALS_SETUP.md) — Google OAuth and Slack webhook integration guide.
- 🔌 [Integration Center](./docs/integrations/README.md) — Setting up automated notifications securely.
- 🤝 [Contributing Guidelines](./docs/CONTRIBUTING.md) — Commit style guide, branch naming rules, and PR checklist.
