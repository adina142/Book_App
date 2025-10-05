// setupTests.js
// This file is automatically recognized by Create React App (CRA)
// for configuring tests before running them.

import "@testing-library/jest-dom";

// Optional: mock console.error/warn in tests to keep output clean
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
  console.warn.mockRestore();
});
