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
import { Skeleton } from "@/components/ui/skeleton";

import type { Book } from "~/server/database/schema";

// Define the props with explicit types
const props = defineProps<{
  books: Book[];
  loading?: boolean;
}>();

const isLoading = computed(() => props.loading || false);

function handleClick(bookId: number) {
  return navigateTo(`/book/${bookId}`);
}
</script>

<template>
  <Table>
    <TableCaption>
      {{
        isLoading
          ? "Loading books..."
          : `${props.books.length} book${props.books.length !== 1 ? "s" : ""} available`
      }}
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Author</TableHead>
        <TableHead>Publication Year</TableHead>
        <TableHead class="text-right">ISBN</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <!-- Loading Skeleton Rows -->
      <template v-if="isLoading">
        <TableRow v-for="i in 5" :key="`skeleton-${i}`">
          <TableCell><Skeleton class="h-4 w-[200px]" /></TableCell>
          <TableCell><Skeleton class="h-4 w-[150px]" /></TableCell>
          <TableCell><Skeleton class="h-4 w-[100px]" /></TableCell>
          <TableCell class="text-right"
            ><Skeleton class="h-4 w-[120px] ml-auto"
          /></TableCell>
        </TableRow>
      </template>

      <!-- Actual Book Rows -->
      <template v-else>
        <TableRow
          v-for="book in props.books"
          :key="book.id"
          class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          @click="handleClick(book.id)"
        >
          <TableCell class="font-medium">{{ book.title }}</TableCell>
          <TableCell>{{ book.author }}</TableCell>
          <TableCell>{{ book.publicationYear }}</TableCell>
          <TableCell class="text-right">
            {{ book.isbn ? book.isbn : "Not specified" }}
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>
