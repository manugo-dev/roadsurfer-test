import { describe, it, expect, vi, beforeEach } from "vitest";

import { isEventOnDate, getEventsForDate } from "./calendar.utils";
import * as dateUtils from "@/modules/shared/utils/date";

import type { CalendarEvent } from "../calendar.types";

vi.mock("@/modules/shared/utils/date", () => ({
  isAfter: vi.fn(),
  isBefore: vi.fn(),
}));

describe("Calendar Utils", () => {
  const mockIsAfter = vi.mocked(dateUtils.isAfter);
  const mockIsBefore = vi.mocked(dateUtils.isBefore);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const testDate = new Date("2023-06-15T10:30:00.000Z");

  const createMockEvent = (id: string, startDate: string, endDate: string): CalendarEvent => ({
    id,
    label: `Event ${id}`,
    startDate,
    endDate,
  });

  describe("isEventOnDate", () => {
    const event = createMockEvent("1", "2023-06-10T09:00:00.000Z", "2023-06-20T18:00:00.000Z");

    it("should return true when date is within event range", () => {
      mockIsAfter.mockReturnValue(true);
      mockIsBefore.mockReturnValue(true);

      const result = isEventOnDate(event, testDate);

      expect(result).toBe(true);
      expect(mockIsAfter).toHaveBeenCalledWith(testDate, event.startDate, "day");
      expect(mockIsBefore).toHaveBeenCalledWith(testDate, event.endDate, "day");
    });

    it("should return false when date is before event start", () => {
      mockIsAfter.mockReturnValue(false);
      mockIsBefore.mockReturnValue(true);

      const result = isEventOnDate(event, testDate);

      expect(result).toBe(false);
    });

    it("should return false when date is after event end", () => {
      mockIsAfter.mockReturnValue(true);
      mockIsBefore.mockReturnValue(false);

      const result = isEventOnDate(event, testDate);

      expect(result).toBe(false);
    });
  });

  describe("getEventsForDate", () => {
    const events = [
      createMockEvent("1", "2023-06-10T09:00:00.000Z", "2023-06-20T18:00:00.000Z"),
      createMockEvent("2", "2023-06-12T10:00:00.000Z", "2023-06-18T17:00:00.000Z"),
      createMockEvent("3", "2023-06-01T08:00:00.000Z", "2023-06-05T16:00:00.000Z"),
    ];

    it("should return events that occur on the given date", () => {
      mockIsAfter.mockImplementation((date, startDate) => {
        const eventId = events.find((e) => e.startDate === startDate)?.id;
        return eventId === "1" || eventId === "2";
      });

      mockIsBefore.mockImplementation((date, endDate) => {
        const eventId = events.find((e) => e.endDate === endDate)?.id;
        return eventId === "1" || eventId === "2";
      });

      const result = getEventsForDate(events, testDate);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    it("should return empty array when no events occur on date", () => {
      mockIsAfter.mockReturnValue(false);
      mockIsBefore.mockReturnValue(false);

      const result = getEventsForDate(events, testDate);

      expect(result).toEqual([]);
    });

    it("should handle empty events array", () => {
      const result = getEventsForDate([], testDate);

      expect(result).toEqual([]);
      expect(mockIsAfter).not.toHaveBeenCalled();
      expect(mockIsBefore).not.toHaveBeenCalled();
    });
  });
});
