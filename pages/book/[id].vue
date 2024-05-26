<script setup lang="ts">
  import type { Book } from "~/server/database/schema"

  const { id: bookId } = useRoute().params
  console.log(bookId)

  const { data: book } = await useFetch(`/api/books/${bookId}`)
</script>

<template>
  <div>
    {{ book }}
  </div>
</template>
