<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const { data } = await useFetch("/api/books")

  const router = useRouter()

  function handleClick(bookId: number) {
    return navigateTo(`/book/${bookId}`)
  }
</script>

<template>
  <Table>
    <TableCaption>Available books.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title </TableHead>
        <TableHead>Author</TableHead>
        <TableHead> Publication Date </TableHead>
        <TableHead class="text-right">Isbn</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="book in data"
        :key="book.id"
        @click="handleClick(book.id)"
      >
        <TableCell class="font-medium"> {{ book.title }} </TableCell>
        <TableCell>{{ book.author }}</TableCell>
        <TableCell>
          {{ new Date(book.publicationDate).toLocaleDateString("fr-FR") }}
        </TableCell>
        <TableCell class="text-right">{{ book.isbn }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
