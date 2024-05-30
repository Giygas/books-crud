<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const props = defineProps(["books"]);

function handleClick(bookId: number) {
  return navigateTo(`/book/${bookId}`);
}
</script>

<template>
  <Table>
    <TableCaption>Available books.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title </TableHead>
        <TableHead>Author</TableHead>
        <TableHead> Publication Year </TableHead>
        <TableHead class="text-right">Isbn</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="book in props.books"
        :key="book.id"
        class="cursor-pointer"
        @click="handleClick(book.id)"
      >
        <TableCell class="font-medium"> {{ book.title }} </TableCell>
        <TableCell>{{ book.author }}</TableCell>
        <TableCell>
          {{ book.publicationYear }}
        </TableCell>
        <TableCell class="text-right">{{
          book.isbn ? book.isbn : "Not specified"
        }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
