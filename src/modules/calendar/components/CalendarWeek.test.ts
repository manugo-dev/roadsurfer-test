import { describe, it, expect, vi } from "vitest";

import CalendarWeek from "./CalendarWeek.vue";
import { mountWithProviders } from "@/test/utils";

import { MOCKED_CALENDAR_EVENTS, MOCKED_WEEK_DAYS } from "../calendar.mocks";

vi.mock("@/modules/calendar/store/calendar.store.ts", () => ({
  useCalendarStore: () => ({
    currentWeek: MOCKED_WEEK_DAYS,
  }),
}));

describe("CalendarWeek.vue", () => {
  it("renders 7 CalendarDay components for the week", () => {
    const wrapper = mountWithProviders(CalendarWeek, {
      props: { events: MOCKED_CALENDAR_EVENTS },
    });
    expect(wrapper.findAllComponents({ name: "CalendarDay" }).length).toBe(7);
  });

  it("emits event-moved with correct payload", async () => {
    const wrapper = mountWithProviders(CalendarWeek, {
      props: { events: MOCKED_CALENDAR_EVENTS },
    });
    await wrapper.findComponent({ name: "CalendarDay" }).vm.$emit("event-moved", MOCKED_CALENDAR_EVENTS[0]);
    expect(wrapper.emitted("event-moved")).toBeTruthy();
  });

  it("emits event-click with correct payload", async () => {
    const wrapper = mountWithProviders(CalendarWeek, {
      props: { events: MOCKED_CALENDAR_EVENTS },
    });
    await wrapper.findComponent({ name: "CalendarDay" }).vm.$emit("event-click", "1");
    expect(wrapper.emitted("event-click")).toBeTruthy();
    expect(wrapper.emitted("event-click")![0]).toEqual(["1"]);
  });
});
