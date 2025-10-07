<script setup lang="ts">
import { getBooksInStorage } from "~/lib/utils";
import { toast } from "vue-sonner";
import { Skeleton } from "@/components/ui/skeleton";

const loading = ref(true);
const books = ref([]);

// Simulate loading for better UX
onMounted(() => {
  setTimeout(() => {
    books.value = getBooksInStorage() || [];
    loading.value = false;
  }, 300);
});

const hasBooks = computed(() => books.value && books.value.length > 0);

const removeAllBooks = () => {
  localStorage.removeItem("localLibrary");
  toast.warning("Books removed from Library !");
  books.value = [];
  navigateTo("/");
};
</script>

<template>
  <div>
    <div class="flex flex-row w-full justify-between items-center py-12">
      <div>
        <h1 class="text-4xl md:text-6xl font-bold">📚 Your Library</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
          {{
            hasBooks
              ? `${books.length} book${books.length !== 1 ? "s" : ""} in your collection`
              : "Your personal book collection"
          }}
        </p>
      </div>
      <Button
        v-if="hasBooks"
        variant="destructive"
        @click="removeAllBooks"
        class="hover:bg-red-600 transition-colors"
      >
        Remove all books
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="i in 8" :key="`skeleton-${i}`" class="space-y-4">
        <Skeleton class="h-[200px] w-full rounded-lg" />
        <Skeleton class="h-4 w-[200px]" />
        <Skeleton class="h-4 w-[150px]" />
      </div>
    </div>
    
    <!-- Empty State -->
    <EmptyState
      v-else-if="!hasBooks"
      icon="📖"
      title="Your library is empty"
      description="Start adding books to build your personal collection"
      action-text="Browse Books"
      action-route="/"
    />
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasBooks" class="text-center py-20">
      <div class="text-6xl mb-4">📖</div>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        Your library is empty
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Start adding books to build your personal collection
      </p>
      <Button @click="$router.push('/')">Browse Books</Button>
    </div>

    <!-- Books Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <div
        v-for="book in books"
        :key="book.id"
        class="group cursor-pointer transform transition-all duration-200 hover:scale-105"
      >
        <NuxtLink :to="`/book/${book.id}`" class="block">
          <div
            class="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
          >
            <img
              :src="book.coverURL"
              :alt="`${book.title} cover`"
              class="w-full h-[200px] object-cover"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200"
            ></div>
          </div>
          <div class="mt-3 space-y-1">
            <h4
              class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors"
            >
              {{ book.title }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ book.author }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
