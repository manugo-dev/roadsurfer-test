import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import type { AutocompleteOption } from "@/modules/shared/components/form/AutocompleteField.vue";
import { isAfter } from "@/modules/shared/utils/date";

import type { Station, StationBooking } from "../stations.types";

export const transformStationToOption = (station: Station): AutocompleteOption => {
  return {
    label: station.name,
    value: station.id,
    description: station.bookings.length ? `Bookings: ${station.bookings.length}` : "No bookings available",
  };
};

export const transformStationBookingToCalendarEvent = (booking: StationBooking): CalendarEvent => {
  return {
    id: String(booking.id),
    label: booking.customerName,
    startDate: booking.startDate,
    endDate: booking.endDate,
  };
};

export const transformStationBookingsToCalendarEvents = (bookings: StationBooking[]): CalendarEvent[] => {
  return bookings
    .slice()
    .sort((a, b) => {
      if (isAfter(a.startDate, b.startDate)) return -1;
      if (isAfter(b.startDate, a.startDate)) return 1;
      return 0;
    })
    .map(transformStationBookingToCalendarEvent);
};
