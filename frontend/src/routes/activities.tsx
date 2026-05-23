import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/activities")({
  beforeLoad: () => {
    throw redirect({ to: "/planner" });
  },
  component: () => null,
});
