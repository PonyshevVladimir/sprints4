<script setup lang="ts">
  import { ref } from 'vue'
  import type { IComm } from '@/types/comms.types'
  import CommTree from './CommentTree.vue'

  const props = defineProps<{
    node: IComm
  }>()

  const isExpanded = ref<boolean>(true)

  function toggleTree() {
    isExpanded.value = !isExpanded.value
  }
</script>

<template>
  <div class="tree-item">
    <div>
      <strong>{{ props.node.author }}</strong>
      <span> ({{ props.node.created_at }})</span>
      <p>{{ props.node.text }}</p>

      <button
        v-if="props.node.children && props.node.children.length > 0"
        type="button"
        @click="toggleTree()"
      >
        {{ isExpanded ? 'Свернуть ответы' : `Показать ответы (${props.node.children.length})` }}
      </button>
    </div>

    <div v-if="isExpanded && props.node.children && props.node.children.length > 0">
      <CommTree v-for="child in props.node.children" :key="child.id" :node="child" />
    </div>
  </div>
</template>
