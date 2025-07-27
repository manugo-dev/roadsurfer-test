<script setup lang="ts">
import { RouterLink } from "vue-router";

import { APP_ROUTES } from "@/modules/core/constants/routes";
</script>

<template>
  <header class="bg-primary text-white shadow-xl">
    <div class="m-auto flex h-12 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-8">
      <RouterLink :to="{ name: APP_ROUTES.DASHBOARD.name }">
        <img src="@/assets/images/text-roadsurfer-light.svg" alt="Logo" class="mr-2 h-6 sm:h-8" />
      </RouterLink>
    </div>
  </header>
</template>
