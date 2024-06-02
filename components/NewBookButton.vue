<script setup lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  const props = defineProps<{
    id: number | undefined
  }>()

  const isBookEdit = props.id ? true : false
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button v-if="!isBookEdit" variant="outline"> Add a new Book </Button>
      <Button v-if="isBookEdit" variant="outline"> Edit Book </Button>
    </DialogTrigger>
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogDescription>
          You can edit the book here. Click submit when you're done.
        </DialogDescription>
      </DialogHeader>
      <NewBookForm :book-id="id" />
    </DialogContent>
  </Dialog>
</template>
