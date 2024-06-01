<script setup lang="ts">
  import { toast } from "vue-sonner"
  import { useMessageData } from "~/lib/store"
  import { selectBookSchema, type Book } from "~/server/database/schema"

  const { data } = await useFetch("/api/books")

  let books: Book[] = []
  if (data.value !== null) {
    const parsedBooks = data.value.map((item) => selectBookSchema.parse(item))
    books = parsedBooks
  }

  const messages = useMessageData()

  watch(messages, () => {
    console.log("Messages: ", messages)
    if (messages.value.success) {
      toast.success(messages.value.message)
    }

    if (messages.value.error) {
      toast.error(messages.value.message)
    }
  })
</script>
<template>
  <div>
    <h1 class="text-6xl">Library</h1>
    <div class="flex flex-row w-full items-center justify-between">
      <p class="text-xl py-5">Here are the available books:</p>
      <NewBookButton />
    </div>
    <BooksTable :books="books" />
  </div>
</template>
