<script lang="ts" setup>
import { ref } from "vue";

import CalendarWeek from "./CalendarWeek.vue";
import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import { useCalendarStore } from "@/modules/calendar/store/calendar.store";

export type CalendarDisplayType = "week";

export interface CalendarDisplayProps {
  events: CalendarEvent[];
  initialDisplay: CalendarDisplayType;
}

const props = defineProps<CalendarDisplayProps>();
const currentDisplay = ref<CalendarDisplayType>(props.initialDisplay || "week");

const emit = defineEmits<{
  (e: "event-moved", payload: CalendarEvent, startDate: string, endDate: string): void;
  (e: "event-click", payload: string): void;
}>();

const calendarStore = useCalendarStore();
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="flex items-center justify-center">
      <div class="flex items-center space-x-4">
        <button
          @click="calendarStore.goToToday"
          class="focus:ring-primary hover:bg-primary hover:border-primary cursor-pointer rounded-md border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:text-white focus:ring-2 focus:outline-none">
          Today
        </button>

        <div class="flex items-center space-x-1">
          <button
            @click="calendarStore.goToPreviousWeek"
            class="focus:ring-primary hover:bg-primary text-zinc-40 cursor-pointer rounded p-2 hover:text-white focus:ring-2 focus:outline-none">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="px-6 text-zinc-500">{{ calendarStore.currentWeekLabel }}</span>
          <button
            @click="calendarStore.goToNextWeek"
            class="focus:ring-primary hover:bg-primary text-zinc-40 cursor-pointer rounded p-2 hover:text-white focus:ring-2 focus:outline-none">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <CalendarWeek
      v-if="currentDisplay === 'week'"
      :events="props.events"
      @event-moved="emit('event-moved', $event, $event.startDate, $event.endDate)"
      @event-click="emit('event-click', $event)"
      class="flex-1 overflow-auto" />
  </div>
</template>
