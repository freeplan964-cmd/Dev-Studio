import type { InterviewQuestionSeed } from "./types.js";

const now = Date.now();

export const aspnetQuestions: InterviewQuestionSeed[] = [
  {
    id: "iq_asp_1",
    area: "backend",
    difficulty: "junior",
    category: "ASP.NET Core",
    question: "What is the ASP.NET Core middleware pipeline and how does it work?",
    answer: "The middleware pipeline is a chain of request-processing components configured in Program.cs. Each middleware can run code before and after the next in the chain via next(). Order is critical: UseAuthentication() must come before UseAuthorization(). Use app.Use() for two-way middleware, app.Run() to terminate the pipeline.",
    tags: ["aspnet", "middleware", "dotnet"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_asp_2",
    area: "backend",
    difficulty: "mid",
    category: "ASP.NET Core",
    question: "Explain the three service lifetimes in ASP.NET Core DI: Transient, Scoped, and Singleton.",
    answer: "Transient: new instance every time it's requested — good for lightweight, stateless services. Scoped: one instance per HTTP request — the default for DbContext and repositories. Singleton: single instance for the app lifetime — use only for thread-safe, stateless services. Never inject a Scoped or Transient service into a Singleton (captive dependency anti-pattern).",
    tags: ["aspnet", "dependency-injection", "dotnet"],
    createdAt: now,
  },
  {
    id: "iq_asp_3",
    area: "backend",
    difficulty: "mid",
    category: "ASP.NET Core",
    question: "What is Entity Framework Core and how do migrations work?",
    answer: "EF Core is an ORM that maps C# entities to database tables via a DbContext. Add-Migration generates a C# migration file based on model changes. Update-Database applies pending migrations. Always review generated migration SQL. In production, apply migrations via scripts (Script-Migration) rather than Update-Database, to maintain control over deployment.",
    tags: ["aspnet", "efcore", "migrations", "dotnet"],
    createdAt: now,
  },
  {
    id: "iq_asp_4",
    area: "backend",
    difficulty: "mid",
    category: "ASP.NET Core",
    question: "How does JWT authentication work in ASP.NET Core?",
    answer: "Register AddAuthentication().AddJwtBearer() in Program.cs with token validation parameters (issuer, audience, signing key). Add UseAuthentication() and UseAuthorization() to the pipeline. Protect endpoints with [Authorize]. The middleware validates the Bearer token on each request, populates HttpContext.User, and returns 401 if invalid. Use claims to pass user data without DB lookups per request.",
    tags: ["aspnet", "jwt", "auth", "dotnet"],
    favorite: true,
    createdAt: now,
  },
  {
    id: "iq_asp_5",
    area: "backend",
    difficulty: "senior",
    category: "ASP.NET Core",
    question: "What is the difference between Minimal APIs and Controller-based APIs in ASP.NET Core?",
    answer: "Minimal APIs (app.MapGet/Post/etc.) define endpoints inline in Program.cs — less ceremony, better performance for simple services. Controller-based: class inheriting ControllerBase with [ApiController] attribute, supports filters, action filters, model binding conventions. Minimal APIs suit microservices; controllers suit large APIs with complex cross-cutting concerns. Both can coexist.",
    tags: ["aspnet", "minimal-api", "controllers", "dotnet"],
    createdAt: now,
  },
];
