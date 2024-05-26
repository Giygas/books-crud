<script setup lang="ts">
  const { data } = await useFetch("/api/books")
</script>
<template>
  <div>
    <h1 class="text-6xl">Library</h1>
    <p class="text-xl py-5">Here are the available books:</p>
    <BooksTable />
  </div>
</template>
