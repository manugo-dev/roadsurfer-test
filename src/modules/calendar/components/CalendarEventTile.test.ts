import { describe, it, expect } from "vitest";

import CalendarEventTile from "./CalendarEventTile.vue";
import { mountWithProviders } from "@/test/utils";

import { MOCKED_CALENDAR_EVENT } from "../calendar.mocks";

describe("CalendarEventTile.vue", () => {
  it("renders event label", () => {
    const wrapper = mountWithProviders(CalendarEventTile, { props: { ...MOCKED_CALENDAR_EVENT } });
    expect(wrapper.find("#eventLabel").text()).toBe(MOCKED_CALENDAR_EVENT.label);
  });

  it("renders formatted start and end dates", () => {
    const wrapper = mountWithProviders(CalendarEventTile, { props: { ...MOCKED_CALENDAR_EVENT } });
    expect(wrapper.find("#startDate").text()).toBe("2024-06-01 10:00:00");
    expect(wrapper.find("#endDate").text()).toBe("2024-06-01 12:00:00");
  });

  it("renders event id", () => {
    const wrapper = mountWithProviders(CalendarEventTile, { props: { ...MOCKED_CALENDAR_EVENT } });
    expect(wrapper.find("#eventId").text()).toBe(`ID: ${MOCKED_CALENDAR_EVENT.id}`);
  });

  it("emits event-click with id when clicked", async () => {
    const wrapper = mountWithProviders(CalendarEventTile, { props: { ...MOCKED_CALENDAR_EVENT } });
    await wrapper.trigger("click");
    expect(wrapper.emitted("event-click")).toBeTruthy();
    expect(wrapper.emitted("event-click")![0]).toEqual([MOCKED_CALENDAR_EVENT.id]);
  });

  it("sets data-id attribute", () => {
    const wrapper = mountWithProviders(CalendarEventTile, { props: { ...MOCKED_CALENDAR_EVENT } });
    expect(wrapper.attributes("data-id")).toBe(MOCKED_CALENDAR_EVENT.id);
  });
});
