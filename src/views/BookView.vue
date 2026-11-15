<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const currentBookId = route.params.bookId
</script>

<template>
  <section>
    <h1>Страница книги № {{ currentBookId }}</h1>
    <RouterLink :to="{ name: 'home' }">Вернуться к списку</RouterLink>
  </section>
</template>
