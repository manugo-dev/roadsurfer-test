import { defineStore } from "pinia";
import { ref } from "vue";

import type { StationBooking } from "../stations.types";

export const useStationsStore = defineStore("stations", () => {
  const currentStation = ref<string>();
  const stationBookings = ref<StationBooking[]>([]);

  const setCurrentStation = (station: string) => {
    currentStation.value = station;
  };

  const setStationBookings = (bookings: StationBooking[]) => {
    stationBookings.value = bookings;
  };

  return { currentStation, setCurrentStation, stationBookings, setStationBookings };
});
