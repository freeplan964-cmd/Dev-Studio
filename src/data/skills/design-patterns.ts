import type { SkillAreaData } from "../../types/skills";
import { GitBranch, Package, Link, Activity, Layers } from "lucide-react";

export const designPatternsArea: SkillAreaData = {
  id: "design-patterns",
  label: "Design Patterns",
  icon: GitBranch,
  description:
    "Reusable solutions to common software design problems — from GoF classics to modern architectural patterns.",
  subAreasLabel: "Categories",
  concepts: [
    {
      title: "What Is a Pattern?",
      body: "A named, proven solution to a recurring design problem. Patterns are language-agnostic templates — they describe intent, structure, and trade-offs, not code.",
    },
    {
      title: "SOLID Principles",
      body: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. The foundation every pattern is built on.",
    },
    {
      title: "Favour Composition",
      body: "Prefer object composition over class inheritance. Inheritance creates tight coupling; composition gives you flexible, swappable behaviour at runtime.",
    },
    {
      title: "Program to Interfaces",
      body: "Depend on abstractions, not concrete implementations. This is what makes patterns like Strategy, Decorator, and Observer possible without modification.",
    },
  ],
  resources: [
    {
      label: "refactoring.guru — Patterns",
      url: "https://refactoring.guru/design-patterns",
      desc: "The best visual catalog of all 23 GoF patterns with real-world examples.",
    },
    {
      label: "Design Patterns (GoF)",
      url: "https://www.oreilly.com/library/view/design-patterns-elements/0201633612/",
      desc: "The original Gang of Four book — Creational, Structural, and Behavioral patterns.",
    },
    {
      label: "Head First Design Patterns",
      url: "https://www.oreilly.com/library/view/head-first-design/9781492077992/",
      desc: "Visual, brain-friendly introduction — great for beginners.",
    },
    {
      label: "Dive Into Design Patterns",
      url: "https://refactoring.guru/design-patterns/book",
      desc: "Modern guide with TypeScript examples.",
    },
    {
      label: "sourcemaking.com",
      url: "https://sourcemaking.com/design_patterns",
      desc: "Concise pattern catalog with UML diagrams.",
    },
  ],
  checklist: [
    { id: "dp-solid", label: "All classes have a single, clearly defined responsibility" },
    { id: "dp-open", label: "New behaviour added via extension, not modification" },
    { id: "dp-iface", label: "Dependencies injected via interfaces, not concrete types" },
    { id: "dp-comp", label: "Composition used instead of inheritance where possible" },
    { id: "dp-overuse", label: "Patterns applied to real problems — not over-engineered" },
    { id: "dp-naming", label: "Pattern names used in code (e.g. UserFactory, OrderObserver)" },
    { id: "dp-doc", label: "Non-obvious patterns documented with rationale in comments" },
  ],
  subAreas: [
    {
      id: "creational",
      label: "Creational",
      icon: Package,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["creational", "factory", "builder", "singleton"],
      concepts: [
        {
          title: "Factory Method",
          body: "Define an interface for creating an object but let subclasses decide which class to instantiate. Decouples creation from usage — swap implementations without touching client code.",
        },
        {
          title: "Abstract Factory",
          body: "Create families of related objects without specifying their concrete classes. Use when your system must be independent of how its products are created, composed, and represented.",
        },
        {
          title: "Builder",
          body: "Separate the construction of a complex object from its representation. Lets the same construction process create different representations — perfect for objects with many optional fields.",
        },
        {
          title: "Singleton",
          body: "Ensure a class has only one instance and provide a global access point. Use sparingly — it introduces global state and makes testing harder. Prefer Dependency Injection instead.",
        },
        {
          title: "Prototype",
          body: "Create new objects by copying an existing object (the prototype). Useful when object creation is expensive and a nearly identical copy is needed — common in game dev and data pipelines.",
        },
      ],
      resources: [
        { label: "Creational Patterns — refactoring.guru", url: "https://refactoring.guru/design-patterns/creational-patterns", desc: "Visual guides for all 5 creational patterns." },
      ],
    },
    {
      id: "structural",
      label: "Structural",
      icon: Link,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["structural", "adapter", "decorator", "facade", "proxy"],
      concepts: [
        {
          title: "Adapter",
          body: "Convert the interface of a class into another interface clients expect. Lets incompatible interfaces work together — essential when integrating third-party libraries.",
        },
        {
          title: "Decorator",
          body: "Attach additional responsibilities to an object dynamically. Provides a flexible alternative to subclassing — stack decorators like middleware layers.",
        },
        {
          title: "Facade",
          body: "Provide a simplified interface to a complex subsystem. Reduces coupling between clients and subsystems — hide complexity behind a clean API.",
        },
        {
          title: "Proxy",
          body: "Provide a surrogate or placeholder for another object. Use for lazy initialisation, access control, caching, logging, or remote communication.",
        },
        {
          title: "Composite",
          body: "Compose objects into tree structures to represent part-whole hierarchies. Lets clients treat individual objects and compositions uniformly — used in UI trees and file systems.",
        },
        {
          title: "Bridge",
          body: "Decouple an abstraction from its implementation so the two can vary independently. Use when you need to extend both the abstraction and implementation through subclassing.",
        },
      ],
      resources: [
        { label: "Structural Patterns — refactoring.guru", url: "https://refactoring.guru/design-patterns/structural-patterns", desc: "Visual guides for all 7 structural patterns." },
      ],
    },
    {
      id: "behavioral",
      label: "Behavioral",
      icon: Activity,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["behavioral", "observer", "strategy", "command", "iterator"],
      concepts: [
        {
          title: "Observer",
          body: "Define a one-to-many dependency so that when one object changes state, all dependents are notified automatically. Foundation of event systems, React state, and pub/sub.",
        },
        {
          title: "Strategy",
          body: "Define a family of algorithms, encapsulate each one, and make them interchangeable. Lets the algorithm vary independently from clients that use it — eliminates large conditionals.",
        },
        {
          title: "Command",
          body: "Encapsulate a request as an object. Supports undoable operations, queuing, logging, and macro commands. Foundation of task queues and CQRS command buses.",
        },
        {
          title: "Chain of Responsibility",
          body: "Pass a request along a chain of handlers. Each handler decides to process the request or pass it on. Used in middleware pipelines, event bubbling, and validation chains.",
        },
        {
          title: "Template Method",
          body: "Define the skeleton of an algorithm in a base class, deferring some steps to subclasses. Lets subclasses redefine certain steps without changing the algorithm's overall structure.",
        },
        {
          title: "Iterator",
          body: "Provide a way to sequentially access elements of a collection without exposing its underlying representation. JavaScript's for...of and generators are native iterator implementations.",
        },
      ],
      resources: [
        { label: "Behavioral Patterns — refactoring.guru", url: "https://refactoring.guru/design-patterns/behavioral-patterns", desc: "Visual guides for all 11 behavioral patterns." },
      ],
    },
    {
      id: "architectural-patterns",
      label: "Architectural",
      icon: Layers,
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["repository", "cqrs", "event-sourcing", "saga", "unit-of-work"],
      concepts: [
        {
          title: "Repository Pattern",
          body: "Abstract data access behind a collection-like interface. Business logic never knows if data comes from Postgres, MongoDB, or an in-memory store. Enables easy testing with mocks.",
        },
        {
          title: "CQRS",
          body: "Command Query Responsibility Segregation — separate the read model from the write model. Enables independent scaling, different data stores per side, and optimized read projections.",
        },
        {
          title: "Event Sourcing",
          body: "Store state changes as a sequence of immutable events. Derive current state by replaying events. Enables full audit logs, temporal queries, and event-driven projections.",
        },
        {
          title: "Unit of Work",
          body: "Track changes to domain objects during a business transaction and coordinate writing them out as a single batch. Prevents partial updates and manages database transactions cleanly.",
        },
        {
          title: "Saga Pattern",
          body: "Manage distributed transactions across multiple services using a sequence of local transactions. Each step publishes an event; on failure, compensating transactions roll back the change.",
        },
      ],
      resources: [
        { label: "Patterns of Enterprise App Architecture", url: "https://martinfowler.com/books/eaa.html", desc: "Martin Fowler's definitive catalog of architectural patterns." },
        { label: "CQRS — Martin Fowler", url: "https://martinfowler.com/bliki/CQRS.html", desc: "Fowler's authoritative explanation of CQRS." },
      ],
    },
  ],
};
