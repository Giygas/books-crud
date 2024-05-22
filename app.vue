<script setup lang="ts">
  const { data } = await useFetch("/api/books", {
    method: "POST",
    body: {
      id: 25,
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
