<script setup lang="ts">
import { RouterLink } from "vue-router"

import { APP_ROUTES } from "@/modules/core/constants/routes"
</script>

<template>
  <header class="bg-primary px-8 py-4 text-white">
    <RouterLink :to="{ name: APP_ROUTES.HOME.name }">
      <span>roadsurfer - coding task</span>
    </RouterLink>
  </header>
</template>
