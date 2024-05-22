<script setup lang="ts">
  const { data } = await useFetch("/api/books", {
    method: "POST",
    body: {
      publicationDate: new Date(),
      title: "Testing this",
      author: "Me bitch",
      isbn: 729523380,
    },
  })
</script>
<template>
  <div>
    {{ data }}
    <NuxtWelcome />
  </div>
</template>
