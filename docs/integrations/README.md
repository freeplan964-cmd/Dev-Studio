# 🔌 Integration Guide

> [!NOTE]
> Dev Studio can be connected to external services to automate notifications and log tasks. This document covers Slack Webhook setup and secure outbound patterns within our Clean Architecture.

---

## 💬 Slack Notification Webhooks

Dev Studio can dispatch automated notifications to a Slack channel when key system events occur (e.g. system status updates, task completions).

### 🛠️ Configuration Setup

1. **Register a Slack Application**:
   Go to [api.slack.com/apps](https://api.slack.com/apps) and create a custom Slack app.
2. **Activate Incoming Webhooks**:
   Under the application features dashboard, navigate to **Incoming Webhooks** and switch the toggle to **Active**.
3. **Generate a Webhook URL**:
   Scroll to the bottom, click **Add New Webhook to Workspace**, select the target channel, and authorize the hook. Copy the generated URL string.
4. **Define Local Environment Secret**:
   Open your local **`backend/.env`** file and define `SLACK_WEBHOOK_URL`:
   ```ini
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
   ```
5. **Verify Request Signature (Optional)**:
   To enable signature validation on incoming Slack webhooks, copy your **Signing Secret** from the Slack Basic Info panel and add it to `backend/.env`:
   ```ini
   SLACK_SIGNING_SECRET=your_slack_signing_secret_here
   ```

---

## 🚀 Adding Custom Integrations

Dev Studio enforces a secure, decoupled communication pattern for all integrations:

> [!WARNING]
> **Outbound Security Gate**: All outgoing API requests to third-party endpoints MUST originate server-side. Never execute direct outbound third-party API calls from client browser code.

### 📝 Step-by-Step Integration Pattern

To register a new integration safely:

1. **Store Tokens Privately**: Add all credentials or API keys as private keys in your **`backend/.env`** file (e.g., `GITHUB_TOKEN=...`). Never check private keys into version control.
2. **Implement an Infrastructure Client**: Create a service wrapper inside `backend/src/infrastructure/` (e.g., `backend/src/infrastructure/github/client.ts`) that initializes and manages HTTP request states.
3. **Define a Controller**: Add a controller under `backend/src/presentation/controllers/` (e.g., `backend/src/presentation/controllers/GithubController.ts`) that reads the credentials securely using `process.env`, validates user session middleware context, and interacts with the infrastructure client.
4. **Register the Routes**: Import and mount your controller actions within [backend/src/presentation/routes.ts](file:///c:/Users/Memo/Downloads/Dev%20Studio/Dev-Studio/backend/src/presentation/routes.ts).
5. **Consume the Endpoint in React**: Trigger the backend endpoint from client views using your custom React query Hooks or Zustand store actions.
