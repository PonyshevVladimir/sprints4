<script setup lang="ts">
</script>

<template>
  <header>
    <h1><RouterLink :to="{ name: `home` }">TogeWriti</RouterLink></h1>
  </header>

  <main>
    <RouterView>

    </RouterView>
  </main>
</template>

<style scoped></style>
