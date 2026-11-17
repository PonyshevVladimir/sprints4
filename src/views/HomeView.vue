<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs} from "pinia";
import { useBooksStore} from "@/stores/books.store";

const booksStore = useBooksStore();
const { displayItems, isLoading, error, hasMoreItems } = storeToRefs(booksStore);
const { loadBooks, loadMore } = useBooksStore();

onMounted(async () => {
  loadBooks()
})
</script>

<template>
  <section>
    <h1>Каталог книг</h1>
    
    <div v-if="isLoading">
      
    </div>
    
    <div v-else-if="error">
      <p>Не удалось загрузить данные: {{error}}</p>
      <button type="button" @click="loadBooks">Попробовать снова</button>
    </div>
    
    <div v-else>
      <ul>
        <li v-for="item in displayItems" :key="item.id">
          <RouterLink :to="{ name: `book-details`, params: { bookId: item.id }}">
            <h2>{{ item.title }}</h2>
            <p>{{ item.author }}</p>
          </RouterLink>
        </li>
      </ul>

      <button v-if="hasMoreItems" type="button" @click="loadMore()">
        Загрузить ещё
      </button>
    </div>
  </section>
  </template>