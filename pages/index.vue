<script setup lang="ts">
  import { selectBookSchema, type Book } from "~/server/database/schema"

  const { data } = await useFetch("/api/books")

  let books: Book[] = []
  if (data.value !== null) {
    const parsedBooks = data.value.map((item) => selectBookSchema.parse(item))
    console.log(parsedBooks)
    books = parsedBooks
  }
</script>
<template>
  <div>
    <h1 class="text-6xl">Library</h1>
    <p class="text-xl py-5">Here are the available books:</p>
    <BooksTable :books="books" />
  </div>
</template>
