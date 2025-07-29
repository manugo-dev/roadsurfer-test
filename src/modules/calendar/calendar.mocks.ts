import type { CalendarEvent } from "./calendar.types";

import { parseDate } from "../shared/utils/date";

export const MOCKED_CALENDAR_EVENT: CalendarEvent = {
  id: "evt-123",
  label: "Test Event",
  startDate: "2024-06-01T10:00:00Z",
  endDate: "2024-06-01T12:00:00Z",
};

export const MOCKED_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "1", label: "Event 1", startDate: "2024-06-10T10:00:00Z", endDate: "2024-06-11T10:00:00Z" },
  { id: "2", label: "Event 2", startDate: "2024-06-11T02:00:00Z", endDate: "2024-06-11T23:00:00Z" },
  { id: "3", label: "Event 3", startDate: "2024-06-12T10:00:00Z", endDate: "2024-06-12T15:00:00Z" },
];

export const MOCKED_WEEK_DAYS = [
  new Date("2024-06-10T00:00:00Z"),
  new Date("2024-06-11T00:00:00Z"),
  new Date("2024-06-12T00:00:00Z"),
  new Date("2024-06-13T00:00:00Z"),
  new Date("2024-06-14T00:00:00Z"),
  new Date("2024-06-15T00:00:00Z"),
  new Date("2024-06-16T00:00:00Z"),
];
