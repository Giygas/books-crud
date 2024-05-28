<script setup lang="ts">
  import { Button } from "@/components/ui/button"
  import { ChevronLeft } from "lucide-vue-next"
  import { addBookToLocal } from "~/lib/utils"
  import type { Book } from "~/server/database/schema"

  import { Skeleton } from "@/components/ui/skeleton"

  const { id: bookId } = useRoute().params

  const { data } = await useFetch<Book>(`/api/books/${bookId}`)

  const book = data.value

  const { pending, data: work } = await useLazyFetch<any>(
    `https://openlibrary.org${book?.openLibraryKey}.json`
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
    addBookToLocal(book)
    console.log("added")
  }
</script>

<template>
  <Button variant="outline" size="icon" @click="$router.back()">
    <ChevronLeft class="w-4 h-4" />
  </Button>

  <div class="flex flex-row mt-10 p-16 gap-10 w-full" v-if="book">
    <div class="shrink-0 h-[125px] w-[250px]">
      <div v-if="loading">
        <Skeleton class="h-[350px] w-[250px] rounded-xl" />
      </div>
      <div v-show="isLoaded">
        <img
          :src="book.coverURL"
          class="object-cover object-center rounded-lg"
          @load="imgLoaded"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2 grow">
      <h2 class="text-6xl pb-8">{{ book.title }}</h2>
      <h3 class="text-xl"><strong>Author:</strong> {{ book.author }}</h3>
      <h3 class="text-xl">
        <strong>Publication Year:</strong>
        {{ book.publicationYear }}
      </h3>
      <h3 class="text-xl">
        <strong>ISBN:</strong> {{ book.isbn ? book.isbn : "Not specified" }}
      </h3>
      <h3 class="text-xl">
        <strong>Description:</strong>
        <div class="flex items-center space-x-4" v-if="pending">
          <div class="space-y-4">
            <Skeleton class="h-4 w-[500px]" />
            <Skeleton class="h-4 w-[400px]" />
            <Skeleton class="h-4 w-[450px]" />
            <Skeleton class="h-4 w-[500px]" />
          </div>
        </div>

        <div v-else>
          <p class="text-lg" v-if="work.description">
            {{
              // Do this because some responses are wrongly formatted
              typeof work.description === "string"
                ? work.description
                : work.description.value
            }}
          </p>

          <p class="text-lg" v-else>No description for this book</p>
        </div>
      </h3>
      <div class="mb-0 mt-auto mr-0 ml-auto">
        <Button
          variant="secondary"
          class="hover:bg-lime-200"
          @click="addToLibrary(book)"
          >Add to Library</Button
        >
      </div>
    </div>
  </div>
  <div v-else>Not found</div>
</template>
