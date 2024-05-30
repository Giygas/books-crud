import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Book } from "~/server/database/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addBookToLocal(book: Book) {
  const localLibrary = localStorage.getItem("localLibrary");

  if (localLibrary) {
    const booksArray: Array<Book> = JSON.parse(localLibrary);
    booksArray.push(book);
    localStorage.setItem("localLibrary", JSON.stringify(booksArray));
    //TODO: don't add the book if it's already in the library
  } else {
    const storageArray: Array<Book> = JSON.parse("[]");
    storageArray.push(JSON.parse(JSON.stringify(book)));
    localStorage.setItem("localLibrary", JSON.stringify(storageArray));
  }

  return { success: true, message: "Book added to library !" };
}

export function removeBookFromLocal(bookId: number) {
  const localLibrary = localStorage.getItem("localLibrary");

  if (localLibrary) {
    const booksArray: Array<Book> = JSON.parse(localLibrary);

    const filteredBooks = booksArray.filter((book) => book.id != bookId);

    localStorage.setItem("localLibrary", JSON.stringify(filteredBooks));

    return { success: true, message: "Book removed successfully" };
  }
}

export function getBooksInStorage() {
  const library = localStorage.getItem("localLibrary");

  if (!library) {
    return null;
  }

  const booksArray: Array<Book> = JSON.parse(library);

  return booksArray;
}
