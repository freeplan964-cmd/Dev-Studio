import fs from "fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev Studio API Documentation",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for Dev Studio backend and frontend integration.",
      contact: {
        name: "Dev Studio Team",
      },
    },
    servers: [
      {
        url: "https://dev-studio-77.vercel.app",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "ds_token",
          description: "Cookie-based session token for secure endpoints",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "swagger-docs.ts"),
    path.join(__dirname, "../controllers/*.ts"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

fs.writeFileSync(
  path.join(__dirname, "swagger-spec.json"),
  JSON.stringify(swaggerSpec, null, 2),
  "utf8"
);
console.log("Successfully generated swagger-spec.json");
