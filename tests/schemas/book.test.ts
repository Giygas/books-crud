import { describe, it, expect } from "vitest";
import { insertBookSchema, selectBookSchema } from "~/server/database/schema";

describe("Book Schemas Validation", () => {
  describe("insertBookSchema", () => {
    it("should validate valid book data", () => {
      const validBook = {
        title: "Test Book",
        author: "Test Author",
        publicationYear: "2023",
        coverURL: "https://example.com/cover.jpg",
        isbn: "1234567890",
        openLibraryKey: "OL123M",
      };

      const result = insertBookSchema.safeParse(validBook);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Test Book");
        expect(result.data.author).toBe("Test Author");
        expect(result.data.publicationYear).toBe(2023);
        expect(result.data.isbn).toBe(1234567890);
      }
    });

    it("should reject invalid book data", () => {
      const invalidBook = {
        title: "", // Empty title should fail
        author: "Test Author",
        publicationYear: "invalid", // Invalid year
        coverURL: "https://example.com/cover.jpg",
        isbn: "1234567890",
        openLibraryKey: "OL123M",
      };

      const result = insertBookSchema.safeParse(invalidBook);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it("should handle nullable ISBN", () => {
      const bookWithoutIsbn = {
        title: "Test Book",
        author: "Test Author",
        publicationYear: "2023",
        coverURL: "https://example.com/cover.jpg",
        isbn: null,
        openLibraryKey: "OL123M",
      };

      const result = insertBookSchema.safeParse(bookWithoutIsbn);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isbn).toBeNull();
      }
    });

    it("should coerce string numbers to integers", () => {
      const bookWithStringNumbers = {
        title: "Test Book",
        author: "Test Author",
        publicationYear: "2023",
        coverURL: "https://example.com/cover.jpg",
        isbn: "1234567890",
        openLibraryKey: "OL123M",
      };

      const result = insertBookSchema.safeParse(bookWithStringNumbers);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(typeof result.data.publicationYear).toBe("number");
        expect(typeof result.data.isbn).toBe("number");
      }
    });
  });

  describe("selectBookSchema", () => {
    it("should validate book data with timestamp", () => {
      const bookWithTimestamp = {
        id: 1,
        title: "Test Book",
        author: "Test Author",
        publicationYear: 2023,
        coverURL: "https://example.com/cover.jpg",
        isbn: 1234567890,
        openLibraryKey: "OL123M",
        createdAt: "2023-01-01T00:00:00.000Z",
      };

      const result = selectBookSchema.safeParse(bookWithTimestamp);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.createdAt).toBeInstanceOf(Date);
        expect(result.data.title).toBe("Test Book");
      }
    });

    it("should handle date coercion", () => {
      const bookWithDateNumber = {
        id: 1,
        title: "Test Book",
        author: "Test Author",
        publicationYear: 2023,
        coverURL: "https://example.com/cover.jpg",
        isbn: 1234567890,
        openLibraryKey: "OL123M",
        createdAt: new Date().getTime(), // timestamp as number
      };

      const result = selectBookSchema.safeParse(bookWithDateNumber);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.createdAt).toBeInstanceOf(Date);
      }
    });
  });
});
