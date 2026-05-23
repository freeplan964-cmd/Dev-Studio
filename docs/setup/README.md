# ⚙️ Setup and Configuration Guide

> [!NOTE]
> Dev Studio runs fully locally in your environment. This guide provides comprehensive, step-by-step instructions for installing dependencies, configuring databases, running migrations, and launching development servers in the monorepo setup.

---

## 🏗️ Step-by-Step Local Setup

Follow these steps to run Dev Studio on your local machine:

### 📥 1. Clone the Project
Clone the repository and navigate into the workspace root.

### 📦 2. Install Project Dependencies
Install all package dependencies in the workspace root:
```bash
npm install
```
This will install all root dependencies and run pre-configuration for frontend and backend workspaces.

### 🔑 3. Configure Secrets (.env)
Create a `.env` file in the **`backend/`** directory. Add the following variables:
```ini
PORT=5000
JWT_SECRET=use_a_strong_random_key_here
DATABASE_URL=postgresql://postgres:password@localhost:5432/dev_studio_db
OPENAI_API_KEY=your_openai_key_here
```
> [!TIP]
> See [Environment Variables](./ENVIRONMENT.md) for a detailed description of all variables.

### 💾 4. Initialize Database Schema and Seeds
Push the Drizzle-mapped schema directly into your local PostgreSQL instance and seed the initial data:
```bash
# Push schema structure to database
npm run db:push --prefix backend

# Seed default questions and templates
npm run db:seed --prefix backend
```

### 🚀 5. Boot the Development Servers
Launch both servers simultaneously using separate terminals or using background commands:
```bash
# Terminal 1: Starts Express server + Nodemon hot reloading
npm run dev:backend

# Terminal 2: Starts Vite server for the frontend React SPA
npm run dev:frontend
```
Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)** (or the port Vite prints in terminal output).

---

## 💻 Available Commands

You can run the following package scripts from the command line:

### Root Level Scripts
| Script | Command | Purpose |
| :--- | :--- | :--- |
| **dev:frontend** | `npm run dev:frontend` | Starts Vite HMR server for the frontend. |
| **dev:backend** | `npm run dev:backend` | Starts Express server with nodemon hot-reload. |
| **build:frontend** | `npm run build:frontend` | Compiles frontend static assets to `frontend/dist/`. |
| **build:backend** | `npm run build:backend` | Prepares backend production builds (if necessary). |
| **lint:frontend** | `npm run lint:frontend` | Lint frontend code. |
| **lint:backend** | `npm run lint:backend` | Lint backend code. |
| **test:frontend** | `npm run test:frontend` | Runs vitest test suite for frontend. |
| **test:backend** | `npm run test:backend` | Runs backend vitest tests. |

### Backend Subdirectory Scripts (`backend/`)
| Script | Command | Purpose |
| :--- | :--- | :--- |
| **dev** | `npm run dev` | Runs nodemon watch loop. |
| **db:push** | `npm run db:push` | Syncs database tables with Drizzle schema. |
| **db:seed** | `npm run db:seed` | Seeds database with mock data and prep resources. |

---

## 📂 Detailed Folder Structure

The directory layout of the Dev Studio monorepo:

```
Dev-Studio/
├── backend/                  # Express 5 Backend (Clean Architecture)
│   ├── src/
│   │   ├── domain/           # Entities, schemas, repository interfaces, enums
│   │   │   ├── schema/       # Modular Drizzle schemas (auth, core, career, etc.)
│   │   │   └── schema.ts     # Aggregated Drizzle schema exports
│   │   ├── application/      # Services executing business use cases
│   │   ├── infrastructure/   # Database connectors, repository adapters, seeds
│   │   │   └── database/     # DB client pools & mock seeds
│   │   └── presentation/     # Routers, controllers, middlewares, configs, docs
│   │       ├── controllers/  # Route controllers (auth, interview, prompts, etc.)
│   │       ├── middleware/   # Authentication, error middlewares
│   │       └── routes.ts     # Main API router registration
│   ├── nodemon.json          # nodemon config (watches src, ignores md/docs)
│   └── package.json
├── frontend/                 # React 19 Frontend (Vite SPA)
│   ├── src/
│   │   ├── components/       # Presentation UI components (shadcn/ui)
│   │   ├── routes/           # TanStack Router layouts and pages
│   │   ├── lib/              # Zustand stores, theme setups, API wrappers
│   │   └── hooks/            # Custom stateful hooks
│   ├── vite.config.ts        # Vite configuration
│   └── package.json
└── docs/                     # Technical Guides and Architectural Specs
```

---

## 🔗 Related Setup Resources

- 🌐 [Environment Configuration](./ENVIRONMENT.md) — Comprehensive guide to variables.
- 🔑 [API Credentials Setup](./CREDENTIALS_SETUP.md) — Setting up Google OAuth and Slack Webhooks.
- 📐 [Architecture Overview](../architecture/README.md) — System design and request pipeline.
