<script setup lang="ts">
import CalendarDay from "./CalendarDay.vue";
import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import { useCalendarStore } from "@/modules/calendar/store/calendar.store.ts";
import { getEventsForDate } from "@/modules/calendar/utils/calendar.utils.ts";

interface Props {
  events: CalendarEvent[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "event-moved", payload: CalendarEvent, startDate: string, endDate: string): void;
  (e: "event-click", payload: string): void;
}>();

const calendarStore = useCalendarStore();
</script>

<template>
  <div class="grid flex-1 grid-cols-1 rounded-lg border-4 border-zinc-200 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
    <CalendarDay
      v-for="day in calendarStore.currentWeek"
      :key="day.getUTCDate()"
      :day="day"
      :events="getEventsForDate(props.events, day)"
      @event-moved="emit('event-moved', $event, $event.startDate, $event.endDate)"
      @event-click="emit('event-click', $event)" />
  </div>
</template>
