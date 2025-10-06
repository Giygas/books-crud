import { db } from "~/server/database/db";
import { books, insertBookSchema, type Book } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  // handle POST requests for the 'api/books' endpoint
  const body = await readBody(event);

  const { data, error } = insertBookSchema.safeParse(body);

  if (error) {
    setResponseStatus(event, 400);
    return {
      success: false,
      error: true,
      message: error.flatten().fieldErrors,
    };
  } else {
    const book = data as Book;
    // If there are no errors, insert the body into the database
    try {
      await db.insert(books).values(book);

      // Book inserted successfully
    } catch (e) {
      setResponseStatus(event, 500);
      return { success: false, error: true, message: String(e) };
    }
    setResponseStatus(event, 201);
    return { success: true, message: "The book has been added", data };
  }
});
