<script setup lang="ts">
  const { data } = await useFetch("/api/books", {
    method: "POST",
    body: {
      publicationDate: new Date(),
      title: "Testing this",
      author: "Me bitch",
    },
  })
  console.log(data)
</script>
<template>
  <div>
    {{ data }}
    <NuxtWelcome />
  </div>
</template>
