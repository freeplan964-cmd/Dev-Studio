import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom";

// Clean up after each test case (e.g. clearing the DOM)
afterEach(() => {
  cleanup();
});
