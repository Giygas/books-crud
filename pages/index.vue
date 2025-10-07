<script setup lang="ts">
import { selectBookSchema, type Book } from "~/server/database/schema";

const route = useRoute();

const { data, pending } = await useFetch("/api/books");

const books = computed(() => {
  if (!data.value) return [];

  try {
    return data.value.map((item) => selectBookSchema.parse(item));
  } catch (error) {
    console.error("Failed to parse book data:", error);
    return [];
  }
});

const hasBooks = computed(() => books.value.length > 0);
</script>
<template>
  <div :key="route.fullPath">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          📚 Library
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Manage your book collection with ease
        </p>
      </div>
      <NewBookButton :id="undefined" />
    </div>

    <!-- Loading State -->
    <LoadingSpinner 
      v-if="pending" 
      type="spinner" 
      size="lg" 
      text="Loading books..." 
      class="py-12"
    />
    
    <!-- Empty State -->
    <EmptyState
      v-else-if="!hasBooks"
      icon="📖"
      title="No books yet"
      description="Start building your library by adding your first book"
      :onAction="() => {}"
    >
      <template #action>
        <NewBookButton :id="undefined" />
      </template>
    </EmptyState>

    <!-- Books Table -->
    <BooksTable v-else :books="books" :loading="pending" />
  </div>
</template>
