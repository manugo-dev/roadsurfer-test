<script lang="ts" setup>
import { ref, watch } from "vue";

import CalendarWeek from "./CalendarWeek.vue";
import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import { useCalendarStore } from "@/modules/calendar/store/calendar.store";
import { parseDate } from "@/modules/shared/utils/date";

export type CalendarDisplayType = "week";

export interface CalendarDisplayProps {
  title?: string;
  description?: string;
  events: CalendarEvent[];
  initialDisplay: CalendarDisplayType;
}

const props = withDefaults(defineProps<CalendarDisplayProps>(), {
  initialDisplay: "week",
});

const currentDisplay = ref<CalendarDisplayType>(props.initialDisplay);

const emit = defineEmits<{
  (e: "event-moved", payload: CalendarEvent, startDate: string, endDate: string): void;
  (e: "event-click", payload: string): void;
}>();

const calendarStore = useCalendarStore();

const lastEventDate = ref<Date | null>(null);

watch(
  () => props.events,
  (events) => {
    if (events.length > 0) {
      lastEventDate.value = parseDate(events[0].startDate);
      calendarStore.goToDateWeek(lastEventDate.value);
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <div class="flex w-full flex-col text-center lg:w-auto lg:flex-auto lg:text-left">
        <span v-if="props.title" class="text-lg font-semibold text-zinc-600">{{ props.title }}</span>
        <span v-if="props.description" class="text-sm font-semibold text-zinc-400">{{ props.description }}</span>
      </div>
      <div class="flex w-full items-center justify-center lg:w-75">
        <button
          @click="calendarStore.goToPreviousWeek"
          class="focus:ring-primary hover:bg-primary text-zinc-40 cursor-pointer rounded p-2 hover:text-white focus:ring-2 focus:outline-none">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="px-4 text-zinc-500">{{ calendarStore.currentWeekLabel }}</span>
        <button
          @click="calendarStore.goToNextWeek"
          class="focus:ring-primary hover:bg-primary text-zinc-40 cursor-pointer rounded p-2 hover:text-white focus:ring-2 focus:outline-none">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div id="actions" class="flex w-full flex-wrap items-center justify-center gap-2 lg:w-52 lg:justify-end">
        <button
          v-if="lastEventDate"
          @click="calendarStore.goToDateWeek(lastEventDate)"
          class="focus:ring-primary hover:bg-primary hover:border-primary cursor-pointer rounded-md border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:text-white focus:ring-2 focus:outline-none">
          Last event
        </button>
        <button
          @click="calendarStore.goToToday"
          class="focus:ring-primary hover:bg-primary hover:border-primary cursor-pointer rounded-md border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:text-white focus:ring-2 focus:outline-none">
          Today
        </button>
      </div>
    </div>
    <CalendarWeek
      v-if="currentDisplay === 'week'"
      :events="props.events"
      @event-moved="emit('event-moved', $event, $event.startDate, $event.endDate)"
      @event-click="emit('event-click', $event)" />
  </div>
</template>
