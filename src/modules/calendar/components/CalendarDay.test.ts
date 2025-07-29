import { describe, it, expect } from "vitest";

import CalendarDay from "./CalendarDay.vue";
import { mountWithProviders } from "@/test/utils";

import { MOCKED_CALENDAR_EVENTS } from "../calendar.mocks";

const mockDay = new Date("2024-06-10");

describe("CalendarDay.vue", () => {
  it("renders day and events", () => {
    const wrapper = mountWithProviders(CalendarDay, {
      props: { day: mockDay, events: MOCKED_CALENDAR_EVENTS },
    });
    expect(wrapper.text()).toContain("Event 1");
    expect(wrapper.text()).toContain("Event 2");
  });

  it("applies today background if day is today", () => {
    const today = new Date();
    const wrapper = mountWithProviders(CalendarDay, {
      props: { day: today, events: [] },
    });
    expect(wrapper.classes()).toContain("bg-primary-light");
  });

  it("emits event-click when event is clicked", async () => {
    const wrapper = mountWithProviders(CalendarDay, {
      props: { day: mockDay, events: MOCKED_CALENDAR_EVENTS },
    });
    await wrapper.findComponent({ name: "CalendarEventTile" }).vm.$emit("event-click", "1");
    expect(wrapper.emitted("event-click")).toBeTruthy();
    expect(wrapper.emitted("event-click")![0]).toEqual(["1"]);
  });

  it("emits event-moved with correct payload", async () => {
    const movedEvent = { ...MOCKED_CALENDAR_EVENTS[0], startDate: "2024-06-11", endDate: "2024-06-12" };
    const wrapper = mountWithProviders(CalendarDay, {
      props: { day: mockDay, events: MOCKED_CALENDAR_EVENTS },
    });
    await wrapper.findComponent({ name: "CalendarEventTile" }).vm.$emit("event-moved", movedEvent);
    expect(wrapper.emitted("event-moved")).toBeTruthy();
    const args = wrapper.emitted("event-moved")![0];
    expect(args[0]).toEqual(movedEvent);
    expect(args[1]).toBe("2024-06-11");
    expect(args[2]).toBe("2024-06-12");
  });
});
