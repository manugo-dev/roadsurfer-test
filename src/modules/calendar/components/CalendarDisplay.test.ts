import { describe, it, expect } from "vitest";

import CalendarDisplay from "./CalendarDisplay.vue";
import { mountWithProviders } from "@/test/utils";

import { MOCKED_CALENDAR_EVENTS } from "../calendar.mocks";

describe("CalendarDisplay.vue", () => {
  it("renders title and description when provided", () => {
    const wrapper = mountWithProviders(CalendarDisplay, {
      props: {
        title: "Test Title",
        description: "Test Description",
        events: MOCKED_CALENDAR_EVENTS,
        initialDisplay: "week",
      },
    });
    expect(wrapper.text()).toContain("Test Title");
    expect(wrapper.text()).toContain("Test Description");
  });

  it("renders navigation buttons", () => {
    const wrapper = mountWithProviders(CalendarDisplay, {
      props: {
        events: MOCKED_CALENDAR_EVENTS,
        initialDisplay: "week",
      },
    });
    const buttons = wrapper.findAll("button");
    expect(buttons.some((btn) => btn.text() === "Last event")).toBe(true);
    expect(buttons.some((btn) => btn.text() === "Today")).toBe(true);
  });

  it("emits event-click when event is clicked", async () => {
    const wrapper = mountWithProviders(CalendarDisplay, {
      props: {
        events: MOCKED_CALENDAR_EVENTS,
        initialDisplay: "week",
      },
    });
    await wrapper.findComponent({ name: "CalendarWeek" }).vm.$emit("event-click", MOCKED_CALENDAR_EVENTS[0].id);
    expect(wrapper.emitted("event-click")).toBeTruthy();
    expect(wrapper.emitted("event-click")![0]).toEqual([MOCKED_CALENDAR_EVENTS[0].id]);
  });

  it('shows "Last event" button if lastEventDate is set', () => {
    const wrapper = mountWithProviders(CalendarDisplay, {
      props: {
        events: MOCKED_CALENDAR_EVENTS,
        initialDisplay: "week",
      },
    });
    expect(wrapper.text()).toContain("Last event");
  });

  it('shows "Today" button', () => {
    const wrapper = mountWithProviders(CalendarDisplay, {
      props: {
        events: MOCKED_CALENDAR_EVENTS,
        initialDisplay: "week",
      },
    });
    expect(wrapper.text()).toContain("Today");
  });
});
