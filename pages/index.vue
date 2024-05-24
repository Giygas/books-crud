<script setup lang="ts">
  const { data } = await useFetch("/api/books")
</script>
<template>
  <div>
    <h1 class="text-6xl">Library</h1>
    <p class="text-xl py-5">Here are the available books:</p>
    <ul>
      <li v-for="book in data" :key="book.id">
        <h2>{{ book.title }} - By: {{ book.author }}</h2>
      </li>
    </ul>
  </div>
</template>
