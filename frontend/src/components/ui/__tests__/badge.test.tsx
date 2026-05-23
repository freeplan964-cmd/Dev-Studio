import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge.tsx";

describe("Badge Component", () => {
  it("renders the badge with children text", () => {
    render(<Badge>Test Badge</Badge>);
    const badgeElement = screen.getByText("Test Badge");
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass("bg-primary");
  });

  it("applies the correct classes for variants", () => {
    const { rerender } = render(<Badge variant="secondary">Secondary Badge</Badge>);
    let badgeElement = screen.getByText("Secondary Badge");
    expect(badgeElement).toHaveClass("bg-secondary");

    rerender(<Badge variant="destructive">Destructive Badge</Badge>);
    badgeElement = screen.getByText("Destructive Badge");
    expect(badgeElement).toHaveClass("bg-destructive");

    rerender(<Badge variant="outline">Outline Badge</Badge>);
    badgeElement = screen.getByText("Outline Badge");
    expect(badgeElement).toHaveClass("text-foreground");
  });
});
