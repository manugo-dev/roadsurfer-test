import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { Station, StationBooking } from "../stations.types";
import { transformStationBookingsToCalendarEvents } from "../utils/transformers";

export const useStationsStore = defineStore("stations", () => {
  const currentStation = ref<Station>();
  const stationBookings = ref<StationBooking[]>([]);

  const setCurrentStation = (station?: Station) => {
    currentStation.value = station;
    stationBookings.value = station?.bookings || [];
  };

  const setStationBookings = (bookings: StationBooking[]) => {
    stationBookings.value = bookings;
  };

  const currentStationEvents = computed(() => {
    return transformStationBookingsToCalendarEvents(stationBookings.value);
  });

  return { currentStation, setCurrentStation, stationBookings, setStationBookings, currentStationEvents };
});
