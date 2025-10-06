<script setup lang="ts">
import { getBooksInStorage } from "~/lib/utils";
import { toast } from "vue-sonner";

const removeAllBooks = () => {
  localStorage.removeItem("localLibrary");
  toast.warning("Books removed from Library !");
  navigateTo("/");
};

const books = getBooksInStorage();
</script>

<template>
  <div>
    <div class="flex flex-row w-full justify-between items-center py-12">
      <h1 class="text-6xl">Your Library</h1>
      <Button v-if="books" variant="destructive" @click="removeAllBooks"
        >Remove all books</Button
      >
    </div>
    <div v-if="!books">
      <h2 class="text-2xl">You have no books in your library yet</h2>
    </div>
    <div v-else class="grid grid-cols-auto-fill-100 gap-4">
      <div v-for="book in books" :key="book.id">
        <a :href="`/book/${book.id}`">
        <img :src="book.coverURL" :alt="`${book.title} cover`" />
        <div class="flex flex-col my-4">
          <h4 class="text-xl"><strong>Title: </strong>{{ book.title }}</h4>
          <p class="text-lg"><strong>Author: </strong>{{ book.author }}</p>
        </div>

        </a>
      </div>
    </div>
  </div>
</template>
