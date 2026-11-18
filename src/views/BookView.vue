<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBooksStore } from '@/stores/books.store'
import { useCommsStore } from '@/stores/comms.store'
import CommentTree from '@/components/CommentTree.vue'
import { formatDate } from '@/utils/formatDate'
import DashIcon from '@/icons/dash.svg'
import ArrowLeftIcon from '@/icons/arrow-left.svg'

const route = useRoute()
const currentBookId = Number(route.params.bookId)

const booksStore = useBooksStore()
const commsStore = useCommsStore()

const { allItems: allBooks, isLoading: isBooksLoading } = storeToRefs(booksStore)
const {
  isLoading: isCommsLoading,
  error: commsError,
  alternativeComms,
  editComms,
  loreComms,
  questionComms,
} = storeToRefs(commsStore)

const currentBook = computed(() => allBooks.value.find((book) => book.id === currentBookId))

const formattedBookText = computed(() => {
  const rawText = currentBook.value?.full_text || currentBook.value?.description || ''
  return rawText.replace(/\\n/g, '\n')
})

onMounted(() => {
  booksStore.loadBooks()
  commsStore.loadComms(currentBookId)
})
</script>

<template>
  <section class="max-w-4xl w-full mx-auto flex flex-col gap-6">
    <div>
      <RouterLink
        :to="{ name: 'home' }"
        class="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors"
      >
        <ArrowLeftIcon class="w-7 h-3.5 shrink-0" />
        <span>Вернуться к каталогу</span>
      </RouterLink>
    </div>

    <div class="flex flex-col gap-10">
      <div
        v-if="isBooksLoading"
        class="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 flex flex-col gap-6 animate-pulse"
      >
        <div class="border-b border-stone-100 pb-6 flex flex-col gap-4">
          <div class="h-8 sm:h-10 w-2/3 bg-stone-200 rounded-lg"></div>
          <div class="flex items-center gap-3">
            <div class="h-4 w-32 bg-stone-100 rounded"></div>
            <div class="h-1 w-4 bg-stone-200 rounded"></div>
            <div class="h-4 w-36 bg-stone-100 rounded"></div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="h-4 w-full bg-stone-100 rounded"></div>
          <div class="h-4 w-full bg-stone-100 rounded"></div>
          <div class="h-4 w-11/12 bg-stone-100 rounded"></div>
          <div class="h-4 w-full bg-stone-100 rounded"></div>
          <div class="h-4 w-4/5 bg-stone-100 rounded"></div>
        </div>
      </div>

      <article
        v-else-if="currentBook"
        class="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col gap-6"
      >
        <header class="border-b border-stone-100 pb-6 flex flex-col gap-2">
          <h1 class="text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
            {{ currentBook.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-3 text-sm font-medium text-stone-500">
            <span>Автор: {{ currentBook.author }}</span>
            <DashIcon v-if="currentBook.created_at" class="w-4 h-1 text-stone-400 shrink-0" />
            <span v-if="currentBook.created_at">
              Добавлена: {{ formatDate(currentBook.created_at) }}
            </span>
          </div>
        </header>

        <div
          class="prose prose-stone max-w-none text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line"
        >
          {{ formattedBookText }}
        </div>
      </article>

      <div v-else class="bg-stone-100 rounded-xl p-8 text-center text-stone-600">
        Книга не найдена
      </div>

      <div class="flex flex-col gap-6">
        <h2 class="text-2xl font-bold text-stone-900">Обсуждение произведения</h2>

        <div v-if="isCommsLoading" class="flex flex-col gap-6 animate-pulse">
          <div
            v-for="n in 4"
            :key="n"
            class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5 flex flex-col gap-4"
          >
            <div class="flex items-center gap-2">
              <div class="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
              <div class="h-5 w-48 bg-stone-200 rounded"></div>
            </div>
            <div class="bg-white border border-stone-200 rounded-lg p-4 flex flex-col gap-2.5">
              <div class="flex justify-between">
                <div class="h-4 w-28 bg-stone-200 rounded"></div>
                <div class="h-3.5 w-24 bg-stone-100 rounded"></div>
              </div>
              <div class="h-4 w-full bg-stone-100 rounded"></div>
              <div class="h-4 w-3/4 bg-stone-100 rounded"></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="commsError"
          class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm"
        >
          {{ commsError }}
        </div>

        <div v-else class="flex flex-col gap-8">
          <section
            class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5 flex flex-col gap-1"
          >
            <div class="flex items-center gap-2 pb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <h3 class="text-lg font-bold text-stone-900">
                Альтернативный сюжет ({{ alternativeComms.length }})
              </h3>
            </div>
            <p v-if="alternativeComms.length === 0" class="text-sm text-stone-500">
              Пока нет комментариев в этой категории.
            </p>
            <CommentTree v-for="comm in alternativeComms" :key="comm.id" :node="comm" />
          </section>

          <section
            class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5 flex flex-col gap-1"
          >
            <div class="flex items-center gap-2 pb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <h3 class="text-lg font-bold text-stone-900">Правки ({{ editComms.length }})</h3>
            </div>
            <p v-if="editComms.length === 0" class="text-sm text-stone-500">
              Пока нет комментариев в этой категории.
            </p>
            <CommentTree v-for="comm in editComms" :key="comm.id" :node="comm" />
          </section>

          <section
            class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5 flex flex-col gap-1"
          >
            <div class="flex items-center gap-2 pb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 class="text-lg font-bold text-stone-900">
                Лор и мир книги ({{ loreComms.length }})
              </h3>
            </div>
            <p v-if="loreComms.length === 0" class="text-sm text-stone-500">
              Пока нет комментариев в этой категории.
            </p>
            <CommentTree v-for="comm in loreComms" :key="comm.id" :node="comm" />
          </section>

          <section
            class="bg-stone-100/70 border border-stone-200/80 rounded-xl p-5 flex flex-col gap-1"
          >
            <div class="flex items-center gap-2 pb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <h3 class="text-lg font-bold text-stone-900">Вопросы ({{ questionComms.length }})</h3>
            </div>
            <p v-if="questionComms.length === 0" class="text-sm text-stone-500">
              Пока нет комментариев в этой категории.
            </p>
            <CommentTree v-for="comm in questionComms" :key="comm.id" :node="comm" />
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
