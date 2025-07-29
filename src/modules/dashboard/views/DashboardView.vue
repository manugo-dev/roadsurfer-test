<script setup lang="ts">
import { useRouter } from "vue-router";

import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import CalendarDisplay from "@/modules/calendar/components/CalendarDisplay.vue";
import { APP_ROUTES } from "@/modules/core/constants/routes";
import StationFinderInput from "@/modules/stations/components/StationFinderInput.vue";
import { useStationsCalendar } from "@/modules/stations/composables/useStationsCalendar";

const router = useRouter();
const stationsCalendar = useStationsCalendar();

const handleEventMoved = (event: CalendarEvent, newStartDate: string, newEndDate: string) => {
  // TODO: Implement the logic to handle the event moved action
  console.log("event moved", event, newStartDate, newEndDate);
};

const handleEventClick = (event: string) => {
  router.push({
    name: APP_ROUTES.STATIONS_BOOKING_DETAIL.name,
    params: { stationId: stationsCalendar.getEventStation(event), bookingId: event },
  });
};
</script>

<template>
  <div class="rounded-lg bg-white p-8 shadow-lg">
    <h1 class="sr-only mb-4 text-2xl font-bold text-zinc-800">Dashboard</h1>
    <StationFinderInput class="mb-4" />
    <CalendarDisplay
      initialDisplay="week"
      :events="stationsCalendar.currentStationEvents.value"
      @event-moved="handleEventMoved"
      @event-click="handleEventClick" />
  </div>
</template>
