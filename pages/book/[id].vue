<script setup lang="ts">
  import { Button } from "@/components/ui/button"
  import { ChevronLeft } from "lucide-vue-next"

  const { id: bookId } = useRoute().params

  const { data } = await useFetch(`/api/books/${bookId}`)

  const book = data.value

  const addToLibrary = () => {
    // TODO: add to user library
    console.log("added")
  }
</script>

<template>
  <Button variant="outline" size="icon" @click="$router.back()">
    <ChevronLeft class="w-4 h-4" />
  </Button>

  <div class="flex flex-row mt-10 p-16 gap-10" v-if="book">
    <div>
      <img
        src="https://picsum.photos/seed/picsum/300/600"
        alt="book cover"
        class="w-80 h-96 object-bottom object-cover"
      />
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="text-6xl pb-8">{{ book.title }}</h2>
      <h3 class="text-xl"><strong>Author:</strong> {{ book.author }}</h3>
      <h4 class="text-xl">
        <strong>Publication Date:</strong>
        {{ new Date(book.publicationDate).toLocaleDateString("fr-FR") }}
      </h4>
      <h3 class="text-xl"><strong>ISBN:</strong> {{ book.isbn }}</h3>
      <div class="self-end justify-self-end place-self-end mb-0 mt-auto">
        <Button
          variant="secondary"
          class="hover:bg-lime-200"
          @click="addToLibrary"
          >Add to Library</Button
        >
      </div>
    </div>
  </div>
  <div v-else>Not found</div>
</template>
