<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBooksStore } from '@/stores/books.store'
import { formatDate } from '@/utils/formatDate'
import ArrowIcon from '@/icons/arrow-right.svg'

const booksStore = useBooksStore()
const { displayItems, isLoading, error, hasMoreItems } = storeToRefs(booksStore)
const { loadBooks, loadMore } = booksStore

onMounted(() => {
  loadBooks()
})
</script>

<template>
  <section class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold tracking-tight text-stone-900">Библиотека произведений</h1>
      <p class="text-stone-600">Выберите книгу для чтения и участия в обсуждении сюжета</p>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <div
        v-for="n in 8"
        :key="n"
        class="bg-white rounded-xl border border-stone-200 p-5 flex flex-col justify-between gap-4 xl:aspect-[1/1.414] animate-pulse"
      >
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between gap-2">
            <div class="h-6 w-20 bg-stone-200 rounded-md"></div>
            <div class="h-4 w-24 bg-stone-100 rounded"></div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="h-6 w-4/5 bg-stone-200 rounded"></div>
            <div class="h-4 w-1/2 bg-stone-100 rounded"></div>
          </div>

          <div class="flex flex-col gap-2 pt-1">
            <div class="h-3.5 w-full bg-stone-100 rounded"></div>
            <div class="h-3.5 w-full bg-stone-100 rounded"></div>
            <div class="h-3.5 w-11/12 bg-stone-100 rounded"></div>
            <div class="h-3.5 w-4/5 bg-stone-100 rounded"></div>
          </div>
        </div>

        <div class="pt-3 border-t border-stone-100 flex items-center gap-3">
          <div class="h-4 w-24 bg-stone-200 rounded"></div>
          <div class="h-4 w-8 bg-stone-100 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="flex justify-center py-6">
      <div
        class="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 flex flex-col items-center gap-4 text-center max-w-md w-full"
      >
        <p class="font-medium">{{ error }}</p>
        <button
          type="button"
          class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          @click="loadBooks"
        >
          Попробовать снова
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col gap-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <RouterLink
          v-for="book in displayItems"
          :key="book.id"
          :to="{ name: 'book-details', params: { bookId: book.id } }"
          class="group bg-white rounded-xl border border-stone-200 p-5 flex flex-col justify-between gap-4 xl:aspect-[1/1.414] shadow-xs hover:shadow-md hover:border-amber-400 transition-all"
        >
          <div class="flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span
                class="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md shrink-0"
              >
                Книга #{{ book.id }}
              </span>
              <span v-if="book.created_at" class="text-xs text-stone-400 shrink-0">
                {{ formatDate(book.created_at) }}
              </span>
            </div>

            <div class="flex flex-col gap-1">
              <h2
                class="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug"
              >
                {{ book.title }}
              </h2>
              <p class="text-sm font-medium text-stone-500">{{ book.author }}</p>
            </div>

            <p class="text-sm text-stone-700 line-clamp-5 leading-relaxed">
              {{ book.description }}
            </p>
          </div>

          <div
            class="pt-3 border-t border-stone-100 flex items-center gap-3 text-sm font-semibold text-amber-700 group-hover:text-amber-600 transition-colors shrink-0"
          >
            <span>Читать книгу</span>
            <ArrowIcon
              class="w-8 h-4 transition-transform duration-200 group-hover:translate-x-1.5"
            />
          </div>
        </RouterLink>
      </div>

      <div v-if="hasMoreItems" class="flex justify-center">
        <button
          type="button"
          class="px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-xs cursor-pointer"
          @click="loadMore"
        >
          Загрузить ещё
        </button>
      </div>
    </div>
  </section>
</template>
