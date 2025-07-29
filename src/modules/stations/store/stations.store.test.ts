import { setActivePinia, createPinia } from "pinia";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { useStationsStore } from "./stations.store";

import { MOCKED_BOOKINGS_CALENDAR_EVENTS, MOCKED_STATION } from "../stations.mocks";
import * as transformers from "../utils/transformers";

describe("stations.store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initializes with undefined currentStation and empty stationBookings", () => {
    const store = useStationsStore();
    expect(store.currentStation).toBeUndefined();
    expect(store.stationBookings).toEqual([]);
  });

  it("setCurrentStation sets currentStation and stationBookings", () => {
    const store = useStationsStore();

    store.setCurrentStation(MOCKED_STATION);

    expect(store.currentStation).toStrictEqual(MOCKED_STATION);
    expect(store.stationBookings).toStrictEqual(MOCKED_STATION.bookings);
  });

  it("setCurrentStation with undefined resets currentStation and stationBookings", () => {
    const store = useStationsStore();
    store.setCurrentStation(undefined);

    expect(store.currentStation).toBeUndefined();
    expect(store.stationBookings).toEqual([]);
  });

  it("setStationBookings sets stationBookings", () => {
    const store = useStationsStore();

    store.setStationBookings(MOCKED_STATION.bookings);

    expect(store.stationBookings).toStrictEqual(MOCKED_STATION.bookings);
  });

  it("currentStationEvents returns transformed events", () => {
    const store = useStationsStore();

    const spy = vi
      .spyOn(transformers, "transformStationBookingsToCalendarEvents")
      .mockReturnValue(MOCKED_BOOKINGS_CALENDAR_EVENTS);

    store.setStationBookings(MOCKED_STATION.bookings);

    expect(store.currentStationEvents).toBe(MOCKED_BOOKINGS_CALENDAR_EVENTS);
    expect(spy).toHaveBeenCalledWith(MOCKED_STATION.bookings);

    spy.mockRestore();
  });
});
