<script setup lang="ts">
import { ref } from 'vue'
import type { IComm } from '@/types/comms.types'
import CommentTree from './CommentTree.vue'

const props = defineProps<{
  node: IComm
}>()

const isOpen = ref<boolean>(true)

function toggleBranch() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="mt-3">
    <div class="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs">
      <div class="flex items-center justify-between gap-2 mb-1.5">
        <span class="text-sm font-semibold text-stone-900">{{ props.node.author }}</span>
        <span class="text-xs text-stone-400">{{ props.node.created_at }}</span>
      </div>

      <p class="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
        {{ props.node.text }}
      </p>

      <div v-if="props.node.children && props.node.children.length > 0" class="mt-3">
        <button
          type="button"
          class="text-xs font-medium text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 cursor-pointer"
          @click="toggleBranch"
        >
          <span>{{
            isOpen ? '▾ Свернуть ветку' : `▸ Показать ответы (${props.node.children.length})`
          }}</span>
        </button>
      </div>
    </div>

    <div
      v-if="isOpen && props.node.children && props.node.children.length > 0"
      class="ml-4 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-stone-200 hover:border-amber-300 transition-colors"
    >
      <CommentTree v-for="child in props.node.children" :key="child.id" :node="child" />
    </div>
  </div>
</template>
