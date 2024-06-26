<script setup lang="ts">
  import { Button } from "@/components/ui/button"
  import { ChevronLeft } from "lucide-vue-next"
  import { addBookToLocal } from "~/lib/utils"
  import type { Book } from "~/server/database/schema"
  import { Skeleton } from "@/components/ui/skeleton"
  import { toast } from "vue-sonner"
  import { useMessageData } from "~/lib/store"

  const { id: bookId } = useRoute().params

  const intId = Number(bookId)

  const { pending: bookPending, data: bookFetch } = await useFetch<Book>(
    `/api/books/${bookId}`
  )

  interface WorkDescription {
    description?: string | { value: string }
  }

  const { pending, data: work } = await useLazyFetch<WorkDescription>(
    `https://openlibrary.org${bookFetch.value?.openLibraryKey}.json`
  )

  const isLoaded = useState("isLoaded")
  const loading = useState("loading")

  isLoaded.value = false
  loading.value = true

  const imgLoaded = () => {
    loading.value = false
    isLoaded.value = true
  }

  const addToLibrary = (book: Book) => {
    const result = addBookToLocal(book)
    if (result.success) {
      toast.success(result.message, {
        description: book.title + " by: " + book.author,
      })
    } else {
      toast.error(result.message)
    }
  }

  const messageData = useMessageData()

  // Refresh the page data when a db message goes through
  watch(messageData, async () => {
    await refreshNuxtData()
  })
</script>

<template>
  <div>
    <Button variant="outline" size="icon" @click="$router.back()">
      <ChevronLeft class="w-4 h-4" />
    </Button>

    <div v-if="bookFetch" class="flex flex-row mt-10 p-16 gap-10 w-full">
      <div class="shrink-0 h-[125px] w-[250px]">
        <div v-if="loading">
          <Skeleton class="h-[350px] w-[250px] rounded-xl" />
        </div>
        <div v-show="isLoaded">
          <img
            :src="bookFetch.coverURL"
            class="object-cover object-center rounded-lg"
            alt="{{ bookFetch.title }} cover"
            @load="imgLoaded"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2 grow">
        <h2 class="text-6xl pb-8">
          {{ bookPending ? "Loading..." : bookFetch.title }}
        </h2>
        <h3 class="text-xl"><strong>Author:</strong> {{ bookFetch.author }}</h3>
        <h3 class="text-xl">
          <strong>Publication Year:</strong>
          {{ bookFetch.publicationYear }}
        </h3>
        <h3 class="text-xl">
          <strong>ISBN:</strong>
          {{ bookFetch.isbn ? bookFetch.isbn : "Not specified" }}
        </h3>
        <h3 class="text-xl">
          <strong>Description:</strong>
          <div v-if="pending" class="flex items-center space-x-4">
            <div class="space-y-4">
              <Skeleton class="h-4 w-[500px]" />
              <Skeleton class="h-4 w-[400px]" />
              <Skeleton class="h-4 w-[450px]" />
              <Skeleton class="h-4 w-[500px]" />
            </div>
          </div>

          <div v-else>
            <p v-if="work?.description" class="text-lg">
              {{
                // Do this because some responses are wrongly formatted
                // Safely access the description and handle different formats
                typeof work.description === "object" &&
                work.description !== null
                  ? work.description.value
                  : work.description || ""
              }}
            </p>

            <p v-else class="text-lg">No description for this book</p>
          </div>
        </h3>
        <div class="flex flex-row justify-end gap-4">
          <Button
            variant="secondary"
            class="hover:bg-lime-200"
            @click="addToLibrary(bookFetch)"
            >Add to Library</Button
          >

          <NewBookButton :id="intId" />
        </div>
      </div>
    </div>
    <div v-else>Not found</div>
  </div>
</template>
