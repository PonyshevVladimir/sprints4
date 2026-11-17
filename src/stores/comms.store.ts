import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchBookComments } from '@/api/books.api'
import type { IComm } from '@/types/comms.types'

export const useCommsStore = defineStore("comms", () => {

  const rawComms = ref<IComm[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const alternativeComms = computed(() =>
    rawComms.value.filter((item) => item.category === 'alternative')
  )
  const editComms = computed(() =>
    rawComms.value.filter((item) => item.category === "edit")
  )
  const loreComms = computed(() =>
    rawComms.value.filter((item) => item.category === "lore")
  )
  const questionComms = computed(() =>
    rawComms.value.filter((item) => item.category === "question")
  )

  async function loadComms(bookId: number) {
    isLoading.value = true;
    error.value = null;
    rawComms.value = []

    try {
      rawComms.value = await fetchBookComments(bookId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : `Ошибка при загрузке данных`;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    rawComms,
    isLoading,
    error,
    alternativeComms,
    editComms,
    loreComms,
    questionComms,
    loadComms,
  }
})