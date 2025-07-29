import { isAfter, isBefore } from "@/modules/shared/utils/date";

import type { CalendarEvent } from "../calendar.types";

export function isEventOnDate(event: CalendarEvent, date: Date): boolean {
  return isAfter(date, event.startDate, "day") && isBefore(date, event.endDate, "day");
}

export function getEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter((event) => isEventOnDate(event, date));
}
