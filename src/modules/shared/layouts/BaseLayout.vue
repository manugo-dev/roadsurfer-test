<script setup lang="ts">
import HeaderBar from "@/modules/shared/components/ui/HeaderBar.vue";
</script>

<template>
  <HeaderBar />
  <main class="mx-auto flex w-full max-w-7xl p-4 sm:p-8">
    <router-view />
  </main>
</template>
