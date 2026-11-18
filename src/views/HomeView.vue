<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBooksStore } from '@/stores/books.store'

const booksStore = useBooksStore()
const { displayItems, isLoading, error, hasMoreItems } = storeToRefs(booksStore)
const { loadBooks, loadMore } = booksStore

onMounted(() => {
  loadBooks()
})
</script>

<template>
  <section>
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-stone-900">Библиотека произведений</h1>
      <p class="mt-2 text-stone-600">Выберите книгу для чтения и участия в обсуждении сюжета</p>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-10 w-10 border-4 border-stone-200 border-t-amber-600"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 text-center max-w-md mx-auto"
    >
      <p class="font-medium mb-4">{{ error }}</p>
      <button
        type="button"
        class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
        @click="loadBooks"
      >
        Попробовать снова
      </button>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="item in displayItems"
          :key="item.id"
          :to="{ name: 'book-details', params: { bookId: item.id } }"
          class="group bg-white rounded-xl border border-stone-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-amber-400 transition-all"
        >
          <div>
            <span
              class="inline-block text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-3"
            >
              Книга #{{ item.id }}
            </span>
            <h2
              class="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2"
            >
              {{ item.title }}
            </h2>
            <p class="text-sm font-medium text-stone-500 mb-3">{{ item.author }}</p>
            <p class="text-sm text-stone-600 line-clamp-3 leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <div
            class="mt-5 pt-4 border-t border-stone-100 flex items-center text-sm font-semibold text-amber-700 group-hover:translate-x-1 transition-transform"
          >
            <span>Читать книгу</span>
          </div>
        </RouterLink>
      </div>

      <div v-if="hasMoreItems" class="mt-10 flex justify-center">
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
