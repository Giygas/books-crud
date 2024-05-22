import { randBetweenDate, randBook } from "@ngneat/falso"
import { db } from "./db"
import { books, insertBookSchema, type Book } from "./schema"

const generateBooks = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const randomBook = randBook()

    const book = insertBookSchema.parse({
      title: randomBook.title,
      author: randomBook.author,
      isbn: Math.floor(Math.random() * 1000000000),
      publicationDate: randBetweenDate({
        from: new Date(2000, 0, 1),
        to: new Date(),
      }),
    })

    await db.insert(books).values(book)

    console.log(`Inserted book ${i + 1} of ${count}: ${book.title}`)
  }
}

await generateBooks(20)
