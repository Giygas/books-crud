import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { books, selectBookSchema } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const bookId = Number(getRouterParam(event, "id"));

  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);

  if (book) {
    const parsedBook = selectBookSchema.parse(book[0]);

    return parsedBook;
  } else {
    return null;
  }
});
