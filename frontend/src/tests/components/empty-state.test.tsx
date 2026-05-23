import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "../../components/ui/empty-state";
import { Plus, Inbox } from "lucide-react";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items found" />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<EmptyState title="Empty" description="Add your first item to get started." />);
    expect(screen.getByText("Add your first item to get started.")).toBeInTheDocument();
  });

  it("does not render description when omitted", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByText(/get started/i)).toBeNull();
  });

  it("renders action button with label", () => {
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No agents"
        action={{ label: "Create Agent", onClick, icon: Plus }}
      />
    );
    const btn = screen.getByRole("button", { name: /Create Agent/i });
    expect(btn).toBeInTheDocument();
  });

  it("calls action handler on button click", () => {
    const onClick = vi.fn();
    render(
      <EmptyState title="Empty" action={{ label: "Add", onClick }} />
    );
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not render button when action is omitted", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders icon when provided", () => {
    const { container } = render(<EmptyState title="Empty" icon={Inbox} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <EmptyState title="Empty" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("uses sm size styles", () => {
    const { container } = render(<EmptyState title="Empty" size="sm" icon={Inbox} />);
    expect(container.querySelector("[class*='py-8']")).toBeInTheDocument();
  });

  it("uses lg size styles", () => {
    const { container } = render(<EmptyState title="Empty" size="lg" icon={Inbox} />);
    expect(container.querySelector("[class*='py-20']")).toBeInTheDocument();
  });
});
