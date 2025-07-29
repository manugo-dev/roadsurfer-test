<script setup lang="ts">
import { computed } from "vue";

import type { CalendarEvent } from "@/modules/calendar/calendar.types.ts";
import { DEFAULT_DATE_TIME_FORMAT } from "@/modules/core/constants/date.ts";
import { formatDate } from "@/modules/shared/utils/date.ts";

const props = withDefaults(defineProps<CalendarEvent>(), {});

const startDate = computed(() => formatDate(props.start, DEFAULT_DATE_TIME_FORMAT));
const endDate = computed(() => formatDate(props.end, DEFAULT_DATE_TIME_FORMAT));
</script>

<template>
  <div
    :data-id="id"
    class="flex w-full cursor-pointer flex-col rounded-sm bg-zinc-50 px-4 py-2"
    @click="$emit('event-click', id)">
    <div class="text-md flex flex-col">
      <span class="truncate font-medium text-zinc-900">
        {{ label }}
      </span>
      <span class="truncate text-sm text-zinc-600">{{ startDate }}</span>
      <span class="truncate text-sm text-zinc-600">{{ endDate }}</span>
      <span class="truncate text-xs text-zinc-600">ID: {{ id }}</span>
    </div>
  </div>
</template>
