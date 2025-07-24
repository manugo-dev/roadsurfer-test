<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools"
import { RouterView } from "vue-router"

import RootLayout from "@/modules/shared/layouts/RootLayout.vue"
</script>

<template>
  <RootLayout>
    <RouterView />
  </RootLayout>
  <!-- Vue TanStack Query Devtools -->
  <VueQueryDevtools />
</template>
