import * as React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../hooks/use-auth";

const originalFetch = globalThis.fetch;

function TestConsumer() {
  const { user, isReady } = useAuth();
  return (
    <div>
      <span data-testid="ready">{isReady ? "ready" : "loading"}</span>
      <span data-testid="user">{user ? user.email ?? "no-email" : "null"}</span>
    </div>
  );
}

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("AuthProvider", () => {
  it("starts in loading state", () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      json: async () => null,
    } as any);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId("ready").textContent).toBe("loading");
  });

  it("sets user to null when /api/auth/user returns 401", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Not authenticated" }),
    } as any);

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(screen.getByTestId("ready").textContent).toBe("ready");
  });

  it("sets user from /api/auth/user response", async () => {
    let callCount = 0;
    vi.mocked(globalThis.fetch).mockImplementation(async (url) => {
      callCount++;
      const u = String(url);
      if (u.includes("/api/auth/user")) {
        return { ok: true, json: async () => ({ id: "u1", email: "dev@example.com", displayName: "Dev" }) } as any;
      }
      if (u.includes("/api/profile")) {
        return { ok: true, json: async () => ({ displayName: "Dev", avatarUrl: null, location: null }) } as any;
      }
      return { ok: false, json: async () => null } as any;
    });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId("user").textContent).toBe("dev@example.com");
    expect(screen.getByTestId("ready").textContent).toBe("ready");
  });

  it("throws when useAuth is used outside AuthProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<TestConsumer />);
    }).toThrow("useAuth must be used within AuthProvider");
    consoleError.mockRestore();
  });
});
