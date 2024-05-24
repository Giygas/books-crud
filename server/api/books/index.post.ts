import { db } from "~/server/database/db"
import { books, insertBookSchema } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  // handle POST requests for the 'api/books' endpoint
  const body = await readBody(event)

  const { data, error } = insertBookSchema.safeParse(body)

  if (error) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: true,
      errors: error.flatten().fieldErrors,
    }
  } else {
    // If there are no errors, insert the body into the database
    try {
      const query = await db.insert(books).values(data)
    } catch (e) {
      setResponseStatus(event, 500)
      return { success: false, message: "Database acting weird", error: e }
    }
    setResponseStatus(event, 201)
    return { success: true, message: "The book has been added" }
  }
})
