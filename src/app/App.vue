<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans antialiased">
    <header class="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-stone-200">
      <div
        class="max-w-6xl w-full mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
      >
        <RouterLink
          :to="{ name: 'home' }"
          class="text-xl font-bold tracking-tight text-stone-900 hover:text-amber-700 transition-colors flex items-center gap-2.5"
        >
          <span class="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0"></span>
          <span>TogeWrite</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'home' }"
          class="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          Каталог книг
        </RouterLink>
      </div>
    </header>

    <main class="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
