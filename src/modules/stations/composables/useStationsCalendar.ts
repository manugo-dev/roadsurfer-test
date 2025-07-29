import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

import { getStations } from "../services/stations.service";
import type { Station, StationBooking } from "../stations.types";
import { useStationsStore } from "../store/stations.store";
import { transformStationBookingsToCalendarEvents } from "../utils/transformers";

export const useStationsCalendar = () => {
  const stationsStore = useStationsStore();

  const query = useQuery({
    queryKey: ["stations"],
    queryFn: () => getStations(),
  });

  const currentStationEvents = computed(() => {
    if (stationsStore.stationBookings.length > 0) {
      return transformStationBookingsToCalendarEvents(stationsStore.stationBookings);
    } else {
      const allStationsBookings =
        query.data?.value?.reduce((acc: StationBooking[], station: Station) => {
          return acc.concat(station.bookings);
        }, []) || [];
      return transformStationBookingsToCalendarEvents(allStationsBookings);
    }
  });

  const currentStation = computed(() => stationsStore.currentStation);

  const getEventStation = (eventId: string): string | undefined => {
    const booking = stationsStore.stationBookings.find((event: StationBooking) => String(event.id) === eventId);
    return booking ? booking.pickupReturnStationId : undefined;
  };

  return {
    currentStationEvents,
    currentStation,
    getEventStation,
  };
};
