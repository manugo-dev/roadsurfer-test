<script setup lang="ts">
import { useRouter } from "vue-router";

import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import CalendarDisplay from "@/modules/calendar/components/CalendarDisplay.vue";
import { APP_ROUTES } from "@/modules/core/constants/routes";
import StationFinderInput from "@/modules/stations/components/StationFinderInput.vue";
import { useStationsStore } from "@/modules/stations/store/stations.store";

const router = useRouter();
const stationsStore = useStationsStore();

const handleEventMoved = (event: CalendarEvent, newStartDate: string, newEndDate: string) => {
  // TODO: Implement the logic to handle the event moved action
  console.log("event moved", event, newStartDate, newEndDate);
};

const handleEventClick = (event: string) => {
  router.push({
    name: APP_ROUTES.STATIONS_BOOKING_DETAIL.name,
    params: { stationId: stationsStore.currentStation?.id, bookingId: event },
  });
};
</script>

<template>
  <div class="rounded-lg bg-white p-8 shadow-lg">
    <h1 class="sr-only mb-4 text-2xl font-bold text-zinc-800">Dashboard</h1>
    <StationFinderInput class="mb-6" />
    <div v-if="stationsStore.currentStation" class="mb-4">
      <CalendarDisplay
        :title="`Stations bookings for ${stationsStore.currentStation.name}`"
        description="Click on a booking to view details or move it to a different date"
        initialDisplay="week"
        :events="stationsStore.currentStationEvents"
        @event-moved="handleEventMoved"
        @event-click="handleEventClick" />
    </div>
    <div v-else class="flex h-44 flex-col items-center justify-center text-center text-zinc-500">
      <p class="mb-2 text-xl">Select a station to view bookings</p>
      <p class="text-sm">Use the search bar above to find a station.</p>
    </div>
  </div>
</template>
