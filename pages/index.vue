<script setup lang="ts">
  import { selectBookSchema, type Book } from "~/server/database/schema"

  const route = useRoute()

  const { data } = await useFetch("/api/books")

  let books: Book[] = []
  if (data.value !== null) {
    const parsedBooks = data.value.map((item) => selectBookSchema.parse(item))
    books = parsedBooks
  }
</script>
<template>
  <div :key="route.fullPath">
    <h1 class="text-6xl">Library</h1>
    <div class="flex flex-row w-full items-center justify-between">
      <p class="text-xl py-5">Here are the available books:</p>
      <NewBookButton :id="undefined" />
    </div>
    <BooksTable :books="books" />
  </div>
</template>
