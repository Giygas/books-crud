<script setup lang="ts">
  import { Button } from "@/components/ui/button"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { useMessageData } from "~/lib/store"

  // The component receives the book id to delete
  const props = defineProps<{
    bookId: number
  }>()

  // Use the global messageData object for sending messages through the app
  const messageData = useMessageData()

  async function handleDelete() {
    const { data } = await useLazyFetch(`/api/books/${props.bookId}`, {
      method: "DELETE",
      body: {
        id: props.bookId,
      },
    })

    if (data.value) {
      messageData.value = { ...data.value }

      navigateTo("/")
    }
  }
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive" class="hover:bg-red-950">
        Delete Book
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this book
          from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-700" @click="handleDelete"
          >Delete it !</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
