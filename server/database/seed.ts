import { randBetweenDate, randBook } from "@ngneat/falso"
import { db } from "./db"
import { books, insertBookSchema, type Book } from "./schema"

// Use openlibrary API to get all fiction and love books ( 22 books I think)
const [fantasyBooks, loveBooks] = await Promise.all([
  fetch("https://openlibrary.org/subjects/fantasy.json?details=false").then(
    (r) => r.json()
  ),
  fetch("https://openlibrary.org/subjects/love.json?details=false").then((r) =>
    r.json()
  ),
])

async function insertBook(jsonData: any) {
  const formattedJson = {
    title: jsonData.title,
    author: jsonData.authors[0].name,
    isbn: jsonData.availability?.isbn,
    publicationYear: jsonData.first_publish_year,
    coverId: jsonData.cover_id,
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
