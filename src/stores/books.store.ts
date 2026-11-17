import {ref, computed} from "vue";
import {defineStore} from "pinia";
import {fetchBooksList} from "@/api/books.api";
import type {IBook} from "@/types/book.types";

const ITEMS_PER_PAGE = 8;

export const useBooksStore = defineStore("books", () => {
    const allItems = ref<IBook[]>([]);
    const visibleLimit = ref<number>(ITEMS_PER_PAGE);
    const isLoading = ref<boolean>(false);
    const error = ref<string|null>(null);

    const displayItems = computed(() => {
        return allItems.value.slice(0, visibleLimit.value);
    })

    const hasMoreItems = computed(() => {
        return visibleLimit.value < allItems.value.length;
    })

    async function loadBooks() {
        if (allItems.value.length > 0) return;
        isLoading.value = true;
        error.value = null;

        try {
            allItems.value = await fetchBooksList();
        } catch (err) {
            error.value = err instanceof Error ? err.message : `Ошибка при загрузке данных`;
        } finally {
            isLoading.value = false;
        }
    }

    function loadMore() {
        visibleLimit.value += ITEMS_PER_PAGE;
    }

    return {
        allItems,
        isLoading,
        error,
        displayItems,
        hasMoreItems,
        loadBooks,
        loadMore,
    }
})