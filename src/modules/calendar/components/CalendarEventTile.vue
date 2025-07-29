<script setup lang="ts">
import type { CalendarEvent } from "@/modules/calendar/calendar.types.ts";
import { DEFAULT_DATE_TIME_FORMAT } from "@/modules/core/constants/date.ts";
import { formatDate } from "@/modules/shared/utils/date.ts";

const props = withDefaults(defineProps<CalendarEvent>(), {});
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
      <span class="truncate text-sm text-zinc-600">{{ formatDate(props.startDate, DEFAULT_DATE_TIME_FORMAT) }}</span>
      <span class="truncate text-sm text-zinc-600">{{ formatDate(props.endDate, DEFAULT_DATE_TIME_FORMAT) }}</span>
      <span class="truncate text-xs text-zinc-600">ID: {{ id }}</span>
    </div>
  </div>
</template>
