import type { SkillAreaData } from "../../types/skills";
import { FlaskConical } from "lucide-react";

export const testingArea: SkillAreaData = {
  id: "testing",
  label: "Testing",
  icon: FlaskConical,
  description:
    "Unit, integration, and end-to-end testing strategies — choose your tool to dive deep.",
  concepts: [],
  resources: [],
  checklist: [
    { id: "coverage", label: "Critical paths covered by unit tests" },
    { id: "e2e", label: "E2E smoke tests for main user flows" },
    { id: "ci", label: "Tests run automatically in CI on every PR" },
    { id: "tdd", label: "New bug fixes start with a failing test" },
    { id: "isolation", label: "Unit tests are isolated — no network, DB, or filesystem" },
    { id: "naming", label: "Test names describe behavior, not implementation" },
  ],
  subAreas: [
    {
      id: "vitest",
      label: "Vitest / Jest",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["vitest", "jest", "unit-testing", "testing"],
      concepts: [
        {
          title: "Unit vs Integration Tests",
          body: "Unit tests: test a single function or class in complete isolation — mock all dependencies. Fast (ms), deterministic, pinpoint failures. Integration tests: test how modules work together — may include a real DB or HTTP client. Slower but catch contract mismatches. Unit tests dominate the pyramid; integration tests cover the seams.",
        },
        {
          title: "Vitest vs Jest",
          body: "Vitest is the modern choice for Vite-based projects — native ESM, no babel transforms, shares Vite config (aliases, plugins). Jest is the legacy standard — larger ecosystem, more community resources, but requires babel/ts-jest for TypeScript. Both share a nearly identical API (describe, it, expect). Migrate from Jest to Vitest is usually a one-line config change.",
        },
        {
          title: "Mocking",
          body: "vi.fn() (Vitest) / jest.fn(): creates a mock function that records calls. vi.spyOn(obj, 'method'): wraps an existing method. vi.mock('module'): auto-mocks an entire module. vi.stubEnv('NODE_ENV', 'test'): overrides env vars. Reset mocks between tests with clearMocks: true in config to prevent test pollution.",
        },
        {
          title: "Matchers & Assertions",
          body: "toBe: strict equality (===). toEqual: deep equality (objects/arrays). toThrow: verifies an error is thrown. toHaveBeenCalledWith: verifies mock call arguments. toMatchSnapshot: captures output and flags future changes. toMatchInlineSnapshot: snapshot stored inline in the test file — easier to review in PRs.",
        },
        {
          title: "Async Testing",
          body: "Always return or await async assertions. Use expect.assertions(n) to ensure async code reaches your assertion. resolves/rejects matchers test promise outcomes: await expect(fetchUser()).resolves.toEqual(user). Use fakeTimers (vi.useFakeTimers()) to control setTimeout, setInterval, and Date in tests without waiting.",
        },
        {
          title: "Coverage",
          body: "v8 or istanbul coverage providers. Run with --coverage flag. Key metrics: statements (has every line run?), branches (has every if/else path run?), functions (has every function been called?). 100% coverage doesn't mean bug-free — tests must assert behavior, not just execute code. Focus coverage on business-critical paths.",
        },
      ],
      resources: [
        {
          label: "Vitest Docs",
          url: "https://vitest.dev",
          desc: "Official Vitest documentation — fast unit testing for Vite projects.",
        },
        {
          label: "Jest Docs",
          url: "https://jestjs.io/docs/getting-started",
          desc: "Official Jest documentation and API reference.",
        },
        {
          label: "Testing JavaScript (Kent C. Dodds)",
          url: "https://testingjavascript.com",
          desc: "Comprehensive course on JavaScript testing at every level.",
        },
      ],
      checklist: [
        { id: "vj-isolate", label: "Unit tests mock all I/O — no network or DB in unit tests" },
        { id: "vj-names", label: "Test names read as: it('should [behavior] when [condition]')" },
        { id: "vj-arrange", label: "Arrange-Act-Assert pattern used consistently" },
        { id: "vj-clear", label: "clearMocks: true in config — no state bleeds between tests" },
        { id: "vj-coverage", label: "Coverage report generated in CI; critical paths ≥ 80%" },
        { id: "vj-watch", label: "vitest --watch used in development for rapid feedback" },
      ],
    },
    {
      id: "react-testing",
      label: "React Testing Library",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["react-testing-library", "rtl", "react", "testing"],
      concepts: [
        {
          title: "Test Behavior, Not Implementation",
          body: "RTL's guiding principle: test what the user sees and does, not internal component state or methods. Query by accessible role/label, not class names or test IDs. This means tests survive refactors that don't change behavior — and break when behavior actually changes. Avoid getByClassName, getByTagName, or accessing component internals.",
        },
        {
          title: "Query Priority",
          body: "RTL recommends query priority (most to least preferred): getByRole (accessible role — most semantic), getByLabelText (form inputs), getByPlaceholderText, getByText (visible text), getByDisplayValue, getByAltText (images), getByTitle, getByTestId (last resort — adds data-testid attributes). Accessible queries also verify accessibility.",
        },
        {
          title: "Async Queries",
          body: "findBy* queries are async — they poll until the element appears or timeout. Use them for anything rendered after async operations: findByText, findByRole. waitFor() wraps assertions that poll until they pass. Never use getBy* for async content — it throws immediately if the element doesn't exist yet.",
        },
        {
          title: "User Events",
          body: "userEvent (from @testing-library/user-event) simulates real browser events — more realistic than fireEvent. userEvent.click(), userEvent.type(), userEvent.selectOptions(). Setup with const user = userEvent.setup() before each test. userEvent is async — always await interactions. Prefer it over fireEvent for all user interactions.",
        },
        {
          title: "Rendering & Providers",
          body: "render() mounts the component in a jsdom environment. Wrap components needing context with custom render utility that provides Router, QueryClient, ThemeProvider etc. Create a test-utils.tsx file that exports a custom render() — all tests import from there, not from RTL directly. Cleanup runs automatically after each test.",
        },
        {
          title: "MSW (Mock Service Worker)",
          body: "MSW intercepts HTTP requests at the network level — more realistic than mocking fetch directly. Define handlers (rest.get('/api/users', resolver)). Share handlers between tests and browser development. setupServer from msw/node runs in Jest/Vitest. server.use() adds per-test overrides for error states and edge cases.",
        },
      ],
      resources: [
        {
          label: "Testing Library Docs",
          url: "https://testing-library.com/docs/react-testing-library/intro/",
          desc: "Official RTL documentation — queries, user events, and guides.",
        },
        {
          label: "Common Mistakes (Kent C. Dodds)",
          url: "https://kentcdodds.com/blog/common-mistakes-with-react-testing-library",
          desc: "How to avoid anti-patterns in React Testing Library.",
        },
        {
          label: "MSW Docs",
          url: "https://mswjs.io",
          desc: "Mock Service Worker — API mocking for browser and Node tests.",
        },
      ],
      checklist: [
        { id: "rt-role", label: "Queries use getByRole/getByLabelText — not getByTestId" },
        { id: "rt-user", label: "User interactions use userEvent, not fireEvent" },
        { id: "rt-async", label: "Async content uses findBy* or waitFor — not getBy*" },
        { id: "rt-msw", label: "API calls mocked with MSW — not fetch/axios mocks" },
        { id: "rt-render", label: "Custom render utility wraps providers for all tests" },
        { id: "rt-a11y", label: "jest-axe runs on each component to catch accessibility violations" },
      ],
    },
    {
      id: "playwright",
      label: "Playwright",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["playwright", "e2e", "testing"],
      concepts: [
        {
          title: "What Playwright Tests",
          body: "Playwright automates real browsers (Chromium, Firefox, WebKit) to test entire user flows end-to-end: log in, fill forms, click buttons, navigate pages. E2E tests are the most realistic but slowest — run them on the built app in CI, not dev server. Use for critical paths (checkout, auth, key workflows) — not every UI state.",
        },
        {
          title: "Locators",
          body: "Playwright locators are auto-retrying and wait for elements automatically. Prefer: page.getByRole('button', { name: 'Submit' }), page.getByLabel('Email'), page.getByText('Success'). Use page.getByTestId() for complex UI without accessible hooks. Avoid CSS selectors and XPath — brittle and tied to implementation.",
        },
        {
          title: "Auto-Waiting",
          body: "Playwright waits for elements to be actionable before interacting — visible, enabled, stable (no animation), attached to DOM. This eliminates most explicit waits and await page.waitForTimeout() calls. If you need to wait for something specific, use page.waitForResponse(), page.waitForURL(), or expect(locator).toBeVisible().",
        },
        {
          title: "Page Object Model",
          body: "Page Object Model (POM) encapsulates page interactions in classes. Each page/component has a class with locators and action methods (login(email, password)). Tests use POMs instead of raw locator calls. Benefits: single place to update when UI changes, tests read as user stories. Recommended for test suites > 10 files.",
        },
        {
          title: "API Testing & Network Mocking",
          body: "Playwright can test APIs directly via request.get/post — no browser needed for API tests. page.route() intercepts and mocks network requests in browser tests — control responses for error states and loading states. page.waitForResponse() asserts specific API calls were made during a test flow.",
        },
        {
          title: "Trace Viewer & Debugging",
          body: "PWDEBUG=1 opens the Playwright Inspector — step through tests, inspect locators. playwright show-trace trace.zip opens the Trace Viewer after a CI failure — see every action, network request, and screenshot. Run with --headed to see the browser. record: { mode: 'off' } in config disables video; enable it for debugging flaky tests.",
        },
      ],
      resources: [
        {
          label: "Playwright Docs",
          url: "https://playwright.dev/docs/intro",
          desc: "Official Playwright documentation — APIs, configuration, and guides.",
        },
        {
          label: "Playwright Test Generator",
          url: "https://playwright.dev/docs/codegen",
          desc: "Record user interactions and generate test code automatically.",
        },
        {
          label: "Trace Viewer",
          url: "https://playwright.dev/docs/trace-viewer-intro",
          desc: "Debug failed tests with step-by-step visual trace replay.",
        },
      ],
      checklist: [
        { id: "pw-locators", label: "Locators use getByRole/getByLabel — not CSS or XPath" },
        { id: "pw-wait", label: "No explicit waitForTimeout — rely on Playwright auto-waiting" },
        { id: "pw-pom", label: "Page Object Model used for reusable page interactions" },
        { id: "pw-ci", label: "Tests run against built app in CI — not dev server" },
        { id: "pw-parallel", label: "Tests run in parallel (fullyParallel: true)" },
        { id: "pw-trace", label: "Trace collection enabled on CI failure for debugging" },
        { id: "pw-retry", label: "retries: 2 in CI config to handle transient flakiness" },
      ],
    },
    {
      id: "cypress",
      label: "Cypress",
      color: "border-primary/40 bg-primary/10 text-primary",
      accent: "border-primary/30",
      tags: ["cypress", "e2e", "testing"],
      concepts: [
        {
          title: "Architecture",
          body: "Cypress runs inside the browser — unlike Selenium/Playwright which control browsers remotely. This gives it direct access to the DOM, native browser events, and network. Tests run in the same event loop as your app — you can access window, document, and your app's JS directly. Trade-off: only Chromium-based browsers and Firefox (no WebKit/Safari).",
        },
        {
          title: "Command Chaining & Auto-Retry",
          body: "Cypress commands are chained and asynchronous internally (not standard Promises). cy.get('.btn').click().type('hello'). Cypress automatically retries commands until the assertion passes or timeout is reached. Never add arbitrary cy.wait(500) — use explicit assertions or cy.intercept() to wait for network. Commands execute in order despite looking synchronous.",
        },
        {
          title: "cy.intercept()",
          body: "cy.intercept() stubs HTTP requests — control API responses, inject delays, simulate errors. cy.intercept('GET', '/api/users', { fixture: 'users.json' }) returns mock data. cy.intercept('POST', '/api/login').as('loginReq') then cy.wait('@loginReq') waits for the actual request. Essential for testing error states and loading UX.",
        },
        {
          title: "Fixtures & Custom Commands",
          body: "Fixtures (cypress/fixtures/) store test data as JSON — reusable across tests. cy.fixture('user.json') loads fixture data. Custom commands (cypress/support/commands.ts) extend Cypress: cy.login(email, password) wraps a multi-step flow into one reusable command. Improves test readability and reduces duplication.",
        },
        {
          title: "Component Testing",
          body: "Cypress Component Testing mounts React/Vue/Angular components in a real browser — more realistic than jsdom (React Testing Library). Use for components that rely on real browser APIs (ResizeObserver, IntersectionObserver, canvas). Shares the same cy.get() API as E2E tests. Configure separately in cypress.config.ts.",
        },
        {
          title: "Flakiness & Debugging",
          body: "Common flakiness sources: timing (use intercept/wait not cy.wait(ms)), animation (set CSS transition: none in test), dynamic selectors (use data-cy attributes). Cypress Dashboard records failures with screenshots and video. cypress open runs interactively with the Test Runner UI — see commands and DOM state at each step.",
        },
      ],
      resources: [
        {
          label: "Cypress Docs",
          url: "https://docs.cypress.io",
          desc: "Official Cypress documentation — full API reference and guides.",
        },
        {
          label: "Cypress Best Practices",
          url: "https://docs.cypress.io/guides/references/best-practices",
          desc: "Official guide to avoiding common pitfalls and anti-patterns.",
        },
        {
          label: "Cypress Real World App",
          url: "https://github.com/cypress-io/cypress-realworld-app",
          desc: "Full-stack payment app with comprehensive Cypress test suite for reference.",
        },
      ],
      checklist: [
        { id: "cy-attr", label: "Selectors use data-cy attributes — not CSS classes or text" },
        { id: "cy-wait", label: "No cy.wait(ms) — use cy.intercept().as() + cy.wait('@alias')" },
        { id: "cy-intercept", label: "API calls intercepted for error/loading state tests" },
        { id: "cy-cmd", label: "Repeated auth/navigation flows in custom cy.login() command" },
        { id: "cy-fixture", label: "Test data stored in fixtures — not hardcoded in test files" },
        { id: "cy-ci", label: "Runs headless in CI with --record and Cypress Cloud" },
        { id: "cy-anim", label: "Animations disabled in test environment (transition: none)" },
      ],
    },
  ],
};
