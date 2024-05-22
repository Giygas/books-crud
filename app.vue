<script setup lang="ts">
  const { data } = await useFetch("/api/books/20")
</script>
<template>
  <div>
    {{ data }}
    <NuxtWelcome />
  </div>
</template>
