import { vi } from "vitest";

// Mock h3 functions globally
vi.mock("h3", () => ({
  readBody: vi.fn(),
  defineEventHandler: vi.fn((fn) => fn),
  setResponseStatus: vi.fn(),
  getRouterParam: vi.fn(),
  eventHandler: vi.fn((fn) => fn),
}));

// Mock database
vi.mock("~/server/database/db", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock drizzle-orm
vi.mock("drizzle-orm", () => ({
  eq: vi.fn(),
}));
