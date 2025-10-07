<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-vue-next";
import { addBookToLocal } from "~/lib/utils";
import type { Book } from "~/server/database/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "vue-sonner";
import { useMessageData } from "~/lib/store";

const { id: bookId } = useRoute().params;

const intId = Number(bookId);

const { pending: bookPending, data: bookFetch } = await useFetch<Book>(
  `/api/books/${bookId}`,
);

interface WorkDescription {
  description?: string | { value: string };
}

const { pending, data: work } = await useLazyFetch<WorkDescription>(
  `https://openlibrary.org${bookFetch.value?.openLibraryKey}.json`,
);

const isLoaded = useState("isLoaded");
const loading = useState("loading");

isLoaded.value = false;
loading.value = true;

const imgLoaded = () => {
  loading.value = false;
  isLoaded.value = true;
};

const addToLibrary = (book: Book) => {
  const result = addBookToLocal(book);
  if (result.success) {
    toast.success(result.message, {
      description: book.title + " by: " + book.author,
    });
  } else {
    toast.error(result.message);
  }
};

const messageData = useMessageData();

// Refresh the page data when a db message goes through
watch(messageData, async () => {
  await refreshNuxtData();
});
</script>

<template>
  <div>
    <Button variant="outline" size="icon" @click="$router.back()">
      <ChevronLeft class="w-4 h-4" />
    </Button>

    <!-- Loading State -->
    <div v-if="bookPending" class="flex flex-row mt-10 p-16 gap-10 w-full">
      <div class="shrink-0">
        <Skeleton class="h-[350px] w-[250px] rounded-xl" />
      </div>
      <div class="flex flex-col gap-4 grow">
        <Skeleton class="h-16 w-[400px]" />
        <Skeleton class="h-6 w-[250px]" />
        <Skeleton class="h-6 w-[200px]" />
        <Skeleton class="h-6 w-[150px]" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[500px]" />
          <Skeleton class="h-4 w-[450px]" />
          <Skeleton class="h-4 w-[400px]" />
        </div>
        <div class="flex gap-4 mt-6">
          <Skeleton class="h-10 w-[150px]" />
          <Skeleton class="h-10 w-[100px]" />
        </div>
      </div>
    </div>

    <!-- Book Content -->
    <div v-else-if="bookFetch" class="flex flex-row mt-10 p-16 gap-10 w-full">
      <div class="shrink-0">
        <div v-if="loading" class="relative">
          <Skeleton class="h-[350px] w-[250px] rounded-xl" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            ></div>
          </div>
        </div>
        <Transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
        >
          <img
            v-show="isLoaded"
            :src="bookFetch.coverURL"
            class="object-cover object-center rounded-lg shadow-lg"
            :alt="`${bookFetch.title} cover`"
            @load="imgLoaded"
          />
        </Transition>
      </div>

      <div class="flex flex-col gap-4 grow">
        <h2 class="text-4xl md:text-6xl font-bold pb-4">
          {{ bookFetch.title }}
        </h2>

        <div class="space-y-2">
          <h3 class="text-xl">
            <span class="font-semibold">Author:</span>
            <span class="text-gray-700 dark:text-gray-300">{{
              bookFetch.author
            }}</span>
          </h3>
          <h3 class="text-xl">
            <span class="font-semibold">Publication Year:</span>
            <span class="text-gray-700 dark:text-gray-300">{{
              bookFetch.publicationYear
            }}</span>
          </h3>
          <h3 class="text-xl">
            <span class="font-semibold">ISBN:</span>
            <span class="text-gray-700 dark:text-gray-300">
              {{ bookFetch.isbn ? bookFetch.isbn : "Not specified" }}
            </span>
          </h3>
        </div>

        <div class="mt-6">
          <h3 class="text-xl font-semibold mb-3">Description:</h3>

          <!-- Description Loading State -->
          <div v-if="pending" class="space-y-3">
            <Skeleton class="h-4 w-[500px]" />
            <Skeleton class="h-4 w-[450px]" />
            <Skeleton class="h-4 w-[400px]" />
            <Skeleton class="h-4 w-[475px]" />
          </div>

          <!-- Description Content -->
          <div v-else>
            <Transition
              enter-active-class="transition-opacity duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
            >
              <div>
                <p
                  v-if="work?.description"
                  class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {{
                    // Handle different description formats from Open Library API
                    typeof work.description === "object" &&
                    work.description !== null
                      ? work.description.value
                      : work.description || ""
                  }}
                </p>
                <p v-else class="text-lg text-gray-500 dark:text-gray-400 italic">
                  No description available for this book
                </p>
              </div>
            </Transition>
          </div>
        </div>

        <div class="flex flex-row justify-end gap-4 mt-8">
          <Button
            variant="secondary"
            class="hover:bg-lime-200 transition-colors"
            @click="addToLibrary(bookFetch)"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <div
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-current"
              ></div>
              Adding...
            </span>
            <span v-else>Add to Library</span>
          </Button>

          <NewBookButton :id="intId" />
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="flex flex-col items-center justify-center py-20">
      <div class="text-6xl mb-4">📚</div>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        Book Not Found
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The book you're looking for doesn't exist or has been removed.
      </p>
      <Button @click="$router.push('/')">Back to Library</Button>
    </div>
  </div>
</template>
