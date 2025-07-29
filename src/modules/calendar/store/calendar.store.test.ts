import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";

import { useCalendarStore } from "./calendar.store";
import { DEFAULT_DATE_FORMAT } from "@/modules/core/constants/date";
import { formatDate, getWeekDays, startOfWeek, now, addDays, parseDate } from "@/modules/shared/utils/date";

describe("calendar.store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should initialize with current week", () => {
    const store = useCalendarStore();
    const expectedWeek = getWeekDays(store.currentWeek[0]);
    expect(store.currentWeek).toEqual(expectedWeek);
  });

  it("should compute currentWeekLabel correctly", () => {
    const store = useCalendarStore();
    const week = store.currentWeek;
    const start = week[0];
    const end = week[week.length - 1];
    const expectedLabel = `${formatDate(start, DEFAULT_DATE_FORMAT)} - ${formatDate(end, DEFAULT_DATE_FORMAT)}`;
    expect(store.currentWeekLabel).toBe(expectedLabel);
  });

  it("goToToday sets currentDate to start of current week", () => {
    const store = useCalendarStore();
    store.goToToday();
    expect(store.currentWeek[0]).toEqual(startOfWeek(now()));
  });

  it("goToNextWeek advances currentDate by 7 days", () => {
    const store = useCalendarStore();
    const initialDate = parseDate(store.currentWeek[0]);
    store.goToNextWeek();
    const expectedDate = addDays(initialDate, 7);
    expect(store.currentWeek[0].toDateString()).toBe(startOfWeek(expectedDate).toDateString());
  });

  it("goToPreviousWeek moves currentDate back by 7 days", () => {
    const store = useCalendarStore();
    const initialDate = parseDate(store.currentWeek[0]);
    store.goToPreviousWeek();
    const expectedDate = addDays(initialDate, -7);
    expect(store.currentWeek[0].toDateString()).toBe(startOfWeek(expectedDate).toDateString());
  });

  it("goToDateWeek sets currentDate to start of week for given date", () => {
    const store = useCalendarStore();
    const testDate = new Date(2024, 5, 10); // June 10, 2024
    store.goToDateWeek(testDate);
    expect(store.currentWeek[0]).toEqual(startOfWeek(testDate));
  });
});
