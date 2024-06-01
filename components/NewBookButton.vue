<script setup lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Add a new Book </Button>
    </DialogTrigger>
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle>Add a new Book</DialogTitle>
        <DialogDescription>
          You can add a new book here. Click submit when you're done.
        </DialogDescription>
      </DialogHeader>
      <NewBookForm />
    </DialogContent>
  </Dialog>
</template>
