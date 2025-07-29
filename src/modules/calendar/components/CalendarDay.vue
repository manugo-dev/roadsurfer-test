<script setup lang="ts">
import { formatDate } from "@vueuse/core";
import { computed } from "vue";

import CalendarEventTile from "./CalendarEventTile.vue";
import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import { isToday } from "@/modules/shared/utils/date";

interface Props {
  day: Date;
  events: CalendarEvent[];
  selectedEventId?: string;
  draggingEventId?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "event-moved", payload: CalendarEvent, newStartDate: string, newEndDate: string): void;
  (e: "event-click", eventId: string): void;
}>();

const dayName = computed(() => {
  return formatDate(props.day, "ddd");
});
const dayNumber = computed(() => {
  return formatDate(props.day, "DD/MM/YYYY");
});
const dayIsToday = computed(() => {
  return isToday(props.day);
});
</script>

<template>
  <div
    :class="[
      'flex w-full flex-col flex-wrap gap-2 border-r border-zinc-200 last:border-0',
      { 'bg-primary-light': dayIsToday },
    ]">
    <div :class="['w-full border-b border-zinc-200 py-4 text-center']">
      <div class="text-xs font-medium text-zinc-500 uppercase">
        {{ dayName }}
      </div>
      <div class="mx-auto text-lg font-semibold">
        {{ dayNumber }}
      </div>
    </div>
    <CalendarEventTile
      v-for="event in props.events"
      :key="event.id"
      :id="event.id"
      :label="event.label"
      :start-date="event.startDate"
      :end-date="event.endDate"
      @event-moved="emit('event-moved', $event, $event.startDate, $event.endDate)"
      @event-click="emit('event-click', $event)" />
  </div>
</template>
