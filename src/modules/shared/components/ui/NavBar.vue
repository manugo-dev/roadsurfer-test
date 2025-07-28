<script lang="ts" setup>
import { RouterLink } from "vue-router";

import { APP_ROUTES } from "@/modules/core/constants/routes";

const linkClasses = "text-white sm:text-primary sm:text-lg hover:text-zinc-500";
const activeClasses = "font-bold";
</script>

<template>
  <nav>
    <RouterLink :to="{ name: APP_ROUTES.DASHBOARD.name }" :class="linkClasses" :activeClass="activeClasses">
      Dashboard
    </RouterLink>
  </nav>
</template>
