# 🤝 Contributing to Dev Studio

> [!NOTE]
> Thank you for considering contributing to Dev Studio! We want to make contributing as easy, transparent, and enjoyable as possible. Following these guidelines ensures that your contributions are merged quickly and smoothly.

---

## 🚀 Standard Pull Request Workflow

1. **Fork** the repository and create your feature branch from the `main` branch.
2. Make your **changes** in your local workspace.
3. Ensure all automated validation steps **pass** (see [Validation Checklist](#-pre-commit-validation)).
4. Open a **Pull Request** detailing what your changes do and why they are necessary.

---

## 📂 Git Conventions

### 🌿 Branch Naming Style

| Type                 | Branch Pattern               | Example                     |
| -------------------- | ---------------------------- | --------------------------- |
| ✨ **Feature**       | `feature/short-description`  | `feature/prompt-versioning` |
| 🐛 **Bug Fix**       | `fix/short-description`      | `fix/date-serialization`    |
| 📝 **Documentation** | `docs/short-description`     | `docs/update-architecture`  |
| ⚡ **Refactoring**   | `refactor/short-description` | `refactor/clean-routes`     |

---

### 📝 Commit Message Formatting

We follow simple, descriptive commit prefixes. Use the imperative mood:

```ini
feat: add version history for prompts
fix: resolve JWT session cookie expiration leak
docs: document PostgreSQL connection credentials
refactor: clean up duplicate route imports
chore: upgrade package dependencies
```

---

## 💅 Code Quality & Standards

- **100% Type-Safe**: Use strict TypeScript definitions across the entire workspace. Avoid using `any` whenever possible.
- **Component Cohesion**: Keep frontend components focused, small, and reusable. Avoid bloat.
- **Pre-commit Formatting**: Always format and check code style using Prettier and ESLint.

---

## 🔍 Pre-commit Validation

Before pushing branches or opening a Pull Request, run the validation scripts for both workspaces. All checks must pass:

```bash
# 1. Run codebase linting
npm run lint:frontend
npm run lint:backend

# 2. Format code styling
npm run format:frontend
npm run format:backend

# 3. Verify production compilation
npm run build:frontend
npm run build:backend

# 4. Run automated tests
npm run test:frontend
npm run test:backend
```

---

## 🏷️ PR Submission Checklist

When opening a Pull Request, check off the following requirements:

- [ ] All linting checks pass successfully (`npm run lint:frontend` and `npm run lint:backend`).
- [ ] Strictly compiling TypeScript without errors.
- [ ] Production build succeeds cleanly (`npm run build:frontend` and `npm run build:backend`).
- [ ] The change does not introduce unrelated logic or file edits.
- [ ] Relevant documentation has been updated to reflect the change.
