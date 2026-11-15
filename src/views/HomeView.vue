<script setup lang="ts">
const mockBooks = [
  { id: 1, title: 'Первая тестовая запись' },
  { id: 2, title: 'Вторая тестовая запись' },
]
import { onMounted } from 'vue'
import { fetchBooksList, fetchBook } from '@/api/books.api'

onMounted(async () => {
  const books = await fetchBooksList()
  console.log('Книги:', books)

  const bookDetails = await fetchBook(1)
  console.log('Книга и комментарии:', bookDetails)
})

</script>

<template>
  <section>
    <h1>Список книг</h1>

    <ul>
      <li v-for="book in mockBooks" :key="book.id">
        <RouterLink :to="{ name: 'book-details', params: { bookId: book.id } }">
          {{ book.title }}
        </RouterLink>
      </li>
    </ul>
  </section>
  </template>