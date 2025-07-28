<script setup lang="ts">
import { RouterLink } from "vue-router";

import { APP_ROUTES } from "@/modules/core/constants/routes";
import NavBar from "@/modules/shared/components/ui/NavBar.vue";
import UserMenu from "@/modules/shared/components/ui/UserMenu.vue";
</script>

<template>
  <header class="bg-primary border-primary sm:bg-primary-light h-14 border-b-4 text-white shadow-xl sm:h-36">
    <div class="m-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-8 sm:py-10">
      <RouterLink :to="{ name: APP_ROUTES.DASHBOARD.name }">
        <img src="@/assets/images/text-roadsurfer-light.svg" alt="Logo" class="mr-2 h-6 sm:hidden" />
        <img src="@/assets/images/text-roadsurfer-dark.svg" alt="Logo" class="mr-2 hidden h-12 sm:inline-flex" />
      </RouterLink>
      <NavBar />
      <UserMenu />
    </div>
  </header>
</template>
