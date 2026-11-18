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
  <section class="max-w-4xl mx-auto">
    <RouterLink
      :to="{ name: 'home' }"
      class="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors mb-6"
    >
      <span>Вернуться к каталогу</span>
    </RouterLink>

    <div v-if="isBooksLoading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-8 w-8 border-4 border-stone-200 border-t-amber-600"
      ></div>
    </div>

    <article
      v-else-if="currentBook"
      class="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs mb-10"
    >
      <header class="border-b border-stone-100 pb-6 mb-6">
        <h1 class="text-2xl sm:text-4xl font-bold text-stone-900 leading-tight mb-2">
          {{ currentBook.title }}
        </h1>
        <p class="text-base font-medium text-stone-500">Автор: {{ currentBook.author }}</p>
      </header>

      <div
        class="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line"
      >
        {{ currentBook.full_text || currentBook.description }}
      </div>
    </article>

    <div v-else class="bg-stone-100 rounded-xl p-8 text-center text-stone-600 mb-10">
      Книга не найдена
    </div>

    <div>
      <h2 class="text-2xl font-bold text-stone-900 mb-6">Обсуждение произведения</h2>

      <div v-if="isNotesLoading" class="flex justify-center py-10">
        <div
          class="animate-spin rounded-full h-8 w-8 border-4 border-stone-200 border-t-amber-600"
        ></div>
      </div>

      <div
        v-else-if="notesError"
        class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm"
      >
        {{ notesError }}
      </div>

      <div v-else class="space-y-8">
        <section class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <h3 class="text-lg font-bold text-stone-900">
              Альтернативный сюжет ({{ alternativeComms.length }})
            </h3>
          </div>
          <p v-if="alternativeComms.length === 0" class="text-sm text-stone-500">
            Пока нет комментариев в этой категории.
          </p>
          <CommTree v-for="node in alternativeComms" :key="node.id" :node="node" />
        </section>

        <section class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <h3 class="text-lg font-bold text-stone-900">Правки ({{ editComms.length }})</h3>
          </div>
          <p v-if="editComms.length === 0" class="text-sm text-stone-500">
            Пока нет комментариев в этой категории.
          </p>
          <CommTree v-for="node in editComms" :key="node.id" :node="node" />
        </section>

        <section class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h3 class="text-lg font-bold text-stone-900">
              Лор и мир книги ({{ loreComms.length }})
            </h3>
          </div>
          <p v-if="loreComms.length === 0" class="text-sm text-stone-500">
            Пока нет комментариев в этой категории.
          </p>
          <CommTree v-for="node in loreComms" :key="node.id" :node="node" />
        </section>

        <section class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <h3 class="text-lg font-bold text-stone-900">Вопросы ({{ questionComms.length }})</h3>
          </div>
          <p v-if="questionComms.length === 0" class="text-sm text-stone-500">
            Пока нет комментариев в этой категории.
          </p>
          <CommTree v-for="node in questionComms" :key="node.id" :node="node" />
        </section>
      </div>
    </div>
  </section>
</template>
