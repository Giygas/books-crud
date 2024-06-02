<script setup lang="ts">
  import { Button } from "@/components/ui/button"

  // The component receives the book id to delete
  const props = defineProps<{
    bookId: number
  }>()

  function handleDelete() {
    console.log(props.bookId)
  }
</script>

<template>
  <Button variant="destructive" @click="handleDelete()"> Delete Book </Button>
</template>
