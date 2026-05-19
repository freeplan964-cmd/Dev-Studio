import swaggerSpec from "./swagger-spec.json" assert { type: "json" };
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger", (_req, res) => res.redirect("/api-docs"));
  app.get("/docs", (_req, res) => res.redirect("/api-docs"));
  app.get("/swagger.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}


