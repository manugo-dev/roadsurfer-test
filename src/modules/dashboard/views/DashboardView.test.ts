import { flushPromises } from "@vue/test-utils";
import { describe, it, expect, vi, type Mock } from "vitest";

import DashboardView from "./DashboardView.vue";
import { useStationsStore } from "@/modules/stations/store/stations.store";
import { mountWithProviders } from "@/test/utils";

const push = vi.fn();
vi.mock("vue-router", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useRouter: () => ({ push }),
  };
});
vi.mock("@/modules/stations/store/stations.store");

describe("DashboardView", () => {
  it("shows empty state when no station is selected", async () => {
    const mockStore = {
      currentStation: null,
      currentStationEvents: [],
    };
    (useStationsStore as unknown as Mock).mockReturnValue(mockStore);

    const wrapper = mountWithProviders(DashboardView);
    await flushPromises();

    expect(wrapper.text()).toContain("Select a station to view bookings");
  });

  it("renders CalendarDisplay when a station is selected", async () => {
    const mockStore = {
      currentStation: { id: "123", name: "Station A" },
      currentStationEvents: [],
    };
    (useStationsStore as unknown as Mock).mockReturnValue(mockStore);

    const wrapper = mountWithProviders(DashboardView);
    await flushPromises();

    expect(wrapper.findComponent({ name: "CalendarDisplay" }).exists()).toBe(true);
    expect(wrapper.html()).toContain("Stations bookings for Station A");
  });

  it("calls router.push on event-click", async () => {
    const mockStore = {
      currentStation: { id: "station-id", name: "Station B" },
      currentStationEvents: [],
    };
    (useStationsStore as unknown as Mock).mockReturnValue(mockStore);

    const wrapper = mountWithProviders(DashboardView);

    const calendar = wrapper.findComponent({ name: "CalendarDisplay" });
    calendar.vm.$emit("event-click", "booking-123");
    await flushPromises();

    expect(push).toHaveBeenCalledWith({
      name: "stations-booking-detail",
      params: {
        stationId: "station-id",
        bookingId: "booking-123",
      },
    });
  });

  it("logs event moved data to console", async () => {
    const mockStore = {
      currentStation: { id: "456", name: "Station X" },
      currentStationEvents: [],
    };
    (useStationsStore as unknown as Mock).mockReturnValue(mockStore);

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const wrapper = mountWithProviders(DashboardView);
    const calendar = wrapper.findComponent({ name: "CalendarDisplay" });

    calendar.vm.$emit("event-moved", { id: "e1" }, "2025-08-01", "2025-08-02");
    await flushPromises();

    expect(logSpy).toHaveBeenCalledWith("event moved", { id: "e1" }, "2025-08-01", "2025-08-02");

    logSpy.mockRestore();
  });
});
