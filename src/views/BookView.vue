<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBooksStore } from '@/stores/books.store'
import { useCommsStore } from '@/stores/comms.store'
import CommTree from '@/components/CommentTree.vue'

const route = useRoute()
const currentBookId = Number(route.params.bookId)

const booksStore = useBooksStore()
const commsStore = useCommsStore()

const { allItems, isLoading: isBooksLoading } = storeToRefs(booksStore)
const {
  isLoading: isNotesLoading,
  error: notesError,
  alternativeComms,
  editComms,
  loreComms,
  questionComms,
} = storeToRefs(commsStore)

const currentBook = computed(() => allItems.value.find((item) => item.id === currentBookId))

onMounted(() => {
  booksStore.loadBooks()
  commsStore.loadComms(currentBookId)
})
</script>

<template>
  <section>
    <RouterLink :to="{ name: 'home' }">Вернуться к списку</RouterLink>

    <div v-if="isBooksLoading">Загрузка текста...</div>
    <article v-else-if="currentBook">
      <h1>{{ currentBook.title }}</h1>
      <p>Автор: {{ currentBook.author }}</p>
      <div>{{ currentBook.full_text }}</div>
    </article>
    <div v-else>Запись не найдена</div>

    <hr />

    <h2>Обсуждение</h2>
    <div v-if="isNotesLoading">Загрузка комментариев...</div>
    <div v-else-if="notesError">Ошибка: {{ notesError }}</div>

    <div v-else>
      <section>
        <h3>Альтернатива ({{ alternativeComms.length }})</h3>
        <p v-if="alternativeComms.length === 0">Пока нет комментариев в этой категории</p>
        <CommTree v-for="node in alternativeComms" :key="node.id" :node="node" />
      </section>

      <section>
        <h3>Правки ({{ editComms.length }})</h3>
        <p v-if="editComms.length === 0">Пока нет комментариев в этой категории</p>
        <CommTree v-for="node in editComms" :key="node.id" :node="node" />
      </section>

      <section>
        <h3>Лор ({{ loreComms.length }})</h3>
        <p v-if="loreComms.length === 0">Пока нет комментариев в этой категории</p>
        <CommTree v-for="node in loreComms" :key="node.id" :node="node" />
      </section>

      <section>
        <h3>Вопросы ({{ questionComms.length }})</h3>
        <p v-if="questionComms.length === 0">Пока нет комментариев в этой категории</p>
        <CommTree v-for="node in questionComms" :key="node.id" :node="node" />
      </section>
    </div>
  </section>
</template>
