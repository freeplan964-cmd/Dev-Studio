import { createRequire } from "module";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerSpec = require("./swagger-spec.json") as Record<string, unknown>;

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger", (_req, res) => res.redirect("/api-docs"));
  app.get("/docs", (_req, res) => res.redirect("/api-docs"));
  app.get("/swagger.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}



