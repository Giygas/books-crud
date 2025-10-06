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

    const currentId = book.id;
    const alreadyIn = booksArray.some((element) => element.id == currentId);

    if (!alreadyIn) {
      booksArray.push(book);
    } else {
      return { success: false, message: "Book already in the library" };
    }

    localStorage.setItem("localLibrary", JSON.stringify(booksArray));
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
