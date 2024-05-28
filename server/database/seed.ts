import { randBetweenDate, randBook } from "@ngneat/falso"
import { db } from "./db"
import { books, insertBookSchema, type Book } from "./schema"

// Use openlibrary API to get all love and love books ( 22 books I think)
try {
  const [fantasyBooks, loveBooks] = await Promise.all([
    fetch("https://openlibrary.org/subjects/fantasy.json?details=false").then(
      (r) => r.json()
    ),
    fetch("https://openlibrary.org/subjects/love.json?details=false").then(
      (r) => r.json()
    ),
  ])

  if (!fantasyBooks || !loveBooks) {
    throw createError({
      statusCode: 404,
      statusMessage: "Open Library API unavailable",
    })
  }

  async function insertBook(jsonData: any) {
    const formattedJson = {
      openLibraryKey: jsonData.key,
      title: jsonData.title,
      author: jsonData.authors[0].name,
      isbn: jsonData.availability?.isbn,
      publicationYear: jsonData.first_publish_year,
      coverURL: `https://covers.openlibrary.org/b/id/${jsonData.cover_id}-L.jpg`,
    }
    const bookData = insertBookSchema.parse(formattedJson)

    await db.insert(books).values(bookData)

    console.log("Inserted book: ")
    console.log(bookData)
  }

  for (const book of fantasyBooks.works) {
    insertBook(book)
  }

  for (const book of loveBooks.works) {
    insertBook(book)
  }
} catch (e) {
  console.error(e)
}
