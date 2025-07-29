import { describe, it, expect } from "vitest";

import {
  transformStationToOption,
  transformStationBookingToCalendarEvent,
  transformStationBookingsToCalendarEvents,
} from "./transformers";
import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import type { AutocompleteOption } from "@/modules/shared/components/form/AutocompleteField.vue";

import {
  MOCKED_BOOKING,
  MOCKED_BOOKINGS,
  MOCKED_BOOKINGS_CALENDAR_EVENTS,
  MOCKED_EMPTY_STATION,
  MOCKED_STATION,
} from "../stations.mocks";

describe("transformStationToOption", () => {
  it("should transform a station with bookings to an AutocompleteOption", () => {
    const option: AutocompleteOption = transformStationToOption(MOCKED_STATION);
    expect(option).toEqual({
      label: "Central Station",
      value: "station-1",
      description: "Bookings: 2",
    });
  });

  it("should transform a station with no bookings to an AutocompleteOption", () => {
    const option: AutocompleteOption = transformStationToOption(MOCKED_EMPTY_STATION);
    expect(option).toEqual({
      label: "Empty Station",
      value: "station-2",
      description: "No bookings available",
    });
  });
});

describe("transformStationBookingToCalendarEvent", () => {
  it("should transform a booking to a CalendarEvent", () => {
    const event: CalendarEvent = transformStationBookingToCalendarEvent(MOCKED_BOOKING);
    expect(event).toEqual({
      id: "201",
      label: "Charlie",
      startDate: "2024-07-01",
      endDate: "2024-07-02",
    });
  });
});

describe("transformStationBookingsToCalendarEvents", () => {
  it("should transform and sort bookings to CalendarEvents (descending by startDate)", () => {
    const events = transformStationBookingsToCalendarEvents(MOCKED_BOOKINGS);
    expect(events).toEqual(MOCKED_BOOKINGS_CALENDAR_EVENTS);
  });

  it("should return an empty array when given no bookings", () => {
    expect(transformStationBookingsToCalendarEvents([])).toEqual([]);
  });
});
