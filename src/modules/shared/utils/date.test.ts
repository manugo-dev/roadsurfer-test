import { describe, it, expect, vi, beforeEach } from "vitest";

import * as dateUtils from "@/modules/shared/utils/date";

vi.mock("@/modules/core/constants/date", () => ({
  DEFAULT_DATE_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
}));

describe("Date Utils", () => {
  const testDate = new Date("2023-06-15T10:30:45.000Z");
  const testDate2 = new Date("2023-06-20T15:45:30.000Z");

  beforeEach(() => {
    process.env.TZ = "UTC";
  });

  describe("parseDate", () => {
    it("should parse string date", () => {
      const result = dateUtils.parseDate("2023-06-15T10:30:45.000Z");
      expect(result).toEqual(testDate);
    });

    it("should parse Date object", () => {
      const result = dateUtils.parseDate(testDate);
      expect(result).toEqual(testDate);
    });
  });

  describe("formatDate", () => {
    it("should format with default format", () => {
      const result = dateUtils.formatDate(testDate);
      expect(result).toBe("2023-06-15 10:30:45");
    });

    it("should format with custom format", () => {
      const result = dateUtils.formatDate(testDate, "DD/MM/YYYY");
      expect(result).toBe("15/06/2023");
    });
  });

  describe("now", () => {
    it("should return current date", () => {
      const result = dateUtils.now();
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("addDays", () => {
    it("should add days", () => {
      const result = dateUtils.addDays(testDate, 5);
      expect(result).toEqual(new Date("2023-06-20T10:30:45.000Z"));
    });

    it("should handle negative values", () => {
      const result = dateUtils.addDays(testDate, -5);
      expect(result).toEqual(new Date("2023-06-10T10:30:45.000Z"));
    });
  });

  describe("addWeeks", () => {
    it("should add weeks", () => {
      const result = dateUtils.addWeeks(testDate, 1);
      expect(result).toEqual(new Date("2023-06-22T10:30:45.000Z"));
    });
  });

  describe("addMonths", () => {
    it("should add months", () => {
      const result = dateUtils.addMonths(testDate, 2);
      expect(result).toEqual(new Date("2023-08-15T10:30:45.000Z"));
    });
  });

  describe("addYears", () => {
    it("should add years", () => {
      const result = dateUtils.addYears(testDate, 1);
      expect(result).toEqual(new Date("2024-06-15T10:30:45.000Z"));
    });
  });

  describe("addHours", () => {
    it("should add hours", () => {
      const result = dateUtils.addHours(testDate, 3);
      expect(result).toEqual(new Date("2023-06-15T13:30:45.000Z"));
    });
  });

  describe("addMinutes", () => {
    it("should add minutes", () => {
      const result = dateUtils.addMinutes(testDate, 30);
      expect(result).toEqual(new Date("2023-06-15T11:00:45.000Z"));
    });
  });

  describe("subtractDays", () => {
    it("should subtract days", () => {
      const result = dateUtils.subtractDays(testDate, 5);
      expect(result).toEqual(new Date("2023-06-10T10:30:45.000Z"));
    });
  });

  describe("subtractWeeks", () => {
    it("should subtract weeks", () => {
      const result = dateUtils.subtractWeeks(testDate, 1);
      expect(result).toEqual(new Date("2023-06-08T10:30:45.000Z"));
    });
  });

  describe("subtractMonths", () => {
    it("should subtract months", () => {
      const result = dateUtils.subtractMonths(testDate, 2);
      expect(result).toEqual(new Date("2023-04-15T10:30:45.000Z"));
    });
  });

  describe("subtractYears", () => {
    it("should subtract years", () => {
      const result = dateUtils.subtractYears(testDate, 1);
      expect(result).toEqual(new Date("2022-06-15T10:30:45.000Z"));
    });
  });

  describe("isBefore", () => {
    it("should return true when first date is before second", () => {
      expect(dateUtils.isBefore(testDate, testDate2)).toBe(true);
    });

    it("should work with unit parameter", () => {
      const date1 = new Date("2023-06-15T10:30:45.000Z");
      const date2 = new Date("2023-06-15T15:30:45.000Z");
      expect(dateUtils.isBefore(date1, date2, "day")).toBe(false);
    });
  });

  describe("isAfter", () => {
    it("should return true when first date is after second", () => {
      expect(dateUtils.isAfter(testDate2, testDate)).toBe(true);
    });

    it("should work with unit parameter", () => {
      const date1 = new Date("2023-06-15T15:30:45.000Z");
      const date2 = new Date("2023-06-15T10:30:45.000Z");
      expect(dateUtils.isAfter(date1, date2, "hour")).toBe(true);
    });
  });

  describe("isSameOrBeforeFn", () => {
    it("should return true for same dates", () => {
      expect(dateUtils.isSameOrBeforeFn(testDate, testDate)).toBe(true);
    });

    it("should return true for before dates", () => {
      expect(dateUtils.isSameOrBeforeFn(testDate, testDate2)).toBe(true);
    });
  });

  describe("isSameOrAfterFn", () => {
    it("should return true for same dates", () => {
      expect(dateUtils.isSameOrAfterFn(testDate, testDate)).toBe(true);
    });

    it("should return true for after dates", () => {
      expect(dateUtils.isSameOrAfterFn(testDate2, testDate)).toBe(true);
    });
  });

  describe("isSame", () => {
    it("should return true for same dates", () => {
      expect(dateUtils.isSame(testDate, testDate)).toBe(true);
    });

    it("should work with unit parameter", () => {
      const date1 = new Date("2023-06-15T10:30:45.000Z");
      const date2 = new Date("2023-06-15T15:30:45.000Z");
      expect(dateUtils.isSame(date1, date2, "day")).toBe(true);
    });
  });

  describe("isSameDay", () => {
    it("should return true for same day", () => {
      const date1 = new Date("2023-06-15T10:30:45.000Z");
      const date2 = new Date("2023-06-15T18:45:30.000Z");
      expect(dateUtils.isSameDay(date1, date2)).toBe(true);
    });
  });

  describe("isSameWeek", () => {
    it("should return true for same week", () => {
      const date1 = new Date("2023-06-12T10:30:45.000Z");
      const date2 = new Date("2023-06-16T18:45:30.000Z");
      expect(dateUtils.isSameWeek(date1, date2)).toBe(true);
    });
  });

  describe("isSameMonth", () => {
    it("should return true for same month", () => {
      const date1 = new Date("2023-06-01T10:30:45.000Z");
      const date2 = new Date("2023-06-30T18:45:30.000Z");
      expect(dateUtils.isSameMonth(date1, date2)).toBe(true);
    });
  });

  describe("isSameYear", () => {
    it("should return true for same year", () => {
      const date1 = new Date("2023-01-01T10:30:45.000Z");
      const date2 = new Date("2023-12-31T18:45:30.000Z");
      expect(dateUtils.isSameYear(date1, date2)).toBe(true);
    });
  });

  describe("startOfDay", () => {
    it("should return start of day", () => {
      const result = dateUtils.startOfDay(testDate);
      expect(result).toEqual(new Date("2023-06-15T00:00:00.000Z"));
    });
  });

  describe("endOfDay", () => {
    it("should return end of day", () => {
      const result = dateUtils.endOfDay(testDate);
      expect(result).toEqual(new Date("2023-06-15T23:59:59.999Z"));
    });
  });

  describe("startOfWeek", () => {
    it("should return start of week", () => {
      const result = dateUtils.startOfWeek(testDate);
      expect(result).toEqual(new Date("2023-06-12T00:00:00.000Z"));
    });
  });

  describe("endOfWeek", () => {
    it("should return end of week", () => {
      const result = dateUtils.endOfWeek(testDate);
      expect(result).toEqual(new Date("2023-06-18T23:59:59.999Z"));
    });
  });

  describe("startOfMonth", () => {
    it("should return start of month", () => {
      const result = dateUtils.startOfMonth(testDate);
      expect(result).toEqual(new Date("2023-06-01T00:00:00.000Z"));
    });
  });

  describe("endOfMonth", () => {
    it("should return end of month", () => {
      const result = dateUtils.endOfMonth(testDate);
      expect(result).toEqual(new Date("2023-06-30T23:59:59.999Z"));
    });
  });

  describe("startOfYear", () => {
    it("should return start of year", () => {
      const result = dateUtils.startOfYear(testDate);
      expect(result).toEqual(new Date("2023-01-01T00:00:00.000Z"));
    });
  });

  describe("endOfYear", () => {
    it("should return end of year", () => {
      const result = dateUtils.endOfYear(testDate);
      expect(result).toEqual(new Date("2023-12-31T23:59:59.999Z"));
    });
  });

  describe("startOf", () => {
    it("should return start of specified unit", () => {
      const result = dateUtils.startOf(testDate, "day");
      expect(result).toEqual(new Date("2023-06-15T00:00:00.000Z"));
    });

    it("should work with different units", () => {
      const result = dateUtils.startOf(testDate, "month");
      expect(result).toEqual(new Date("2023-06-01T00:00:00.000Z"));
    });
  });

  describe("endOf", () => {
    it("should return end of specified unit", () => {
      const result = dateUtils.endOf(testDate, "day");
      expect(result).toEqual(new Date("2023-06-15T23:59:59.999Z"));
    });

    it("should work with different units", () => {
      const result = dateUtils.endOf(testDate, "month");
      expect(result).toEqual(new Date("2023-06-30T23:59:59.999Z"));
    });
  });

  describe("toISOString", () => {
    it("should convert date to ISO string", () => {
      const result = dateUtils.toISOString(testDate);
      expect(result).toBe("2023-06-15T10:30:45.000Z");
    });
  });

  describe("fromISOString", () => {
    it("should parse ISO string to date", () => {
      const result = dateUtils.fromISOString("2023-06-15T10:30:45.000Z");
      expect(result).toEqual(testDate);
    });
  });

  describe("getDayOfWeek", () => {
    it("should return day of week", () => {
      const result = dateUtils.getDayOfWeek(testDate);
      expect(result).toBe(4);
    });
  });

  describe("getDayOfMonth", () => {
    it("should return day of month", () => {
      const result = dateUtils.getDayOfMonth(testDate);
      expect(result).toBe(15);
    });
  });

  describe("getMonth", () => {
    it("should return month", () => {
      const result = dateUtils.getMonth(testDate);
      expect(result).toBe(5);
    });
  });

  describe("getYear", () => {
    it("should return year", () => {
      const result = dateUtils.getYear(testDate);
      expect(result).toBe(2023);
    });
  });

  describe("getHour", () => {
    it("should return hour", () => {
      const result = dateUtils.getHour(testDate);
      expect(result).toBe(10);
    });
  });

  describe("getMinute", () => {
    it("should return minute", () => {
      const result = dateUtils.getMinute(testDate);
      expect(result).toBe(30);
    });
  });

  describe("getSecond", () => {
    it("should return second", () => {
      const result = dateUtils.getSecond(testDate);
      expect(result).toBe(45);
    });
  });

  describe("getDaysInMonth", () => {
    it("should return days in month", () => {
      const result = dateUtils.getDaysInMonth(testDate);
      expect(result).toBe(30);
    });

    it("should handle leap year", () => {
      const leapDate = new Date("2024-02-15T10:30:45.000Z");
      const result = dateUtils.getDaysInMonth(leapDate);
      expect(result).toBe(29);
    });
  });

  describe("getWeekOfYear", () => {
    it("should return week of year", () => {
      const result = dateUtils.getWeekOfYear(testDate);
      expect(result).toBe(24);
    });
  });

  describe("isToday", () => {
    it("should return false for past date", () => {
      expect(dateUtils.isToday(testDate)).toBe(false);
    });
  });

  describe("isTomorrow", () => {
    it("should return false for past date", () => {
      expect(dateUtils.isTomorrow(testDate)).toBe(false);
    });
  });

  describe("isYesterday", () => {
    it("should return false for past date", () => {
      expect(dateUtils.isYesterday(testDate)).toBe(false);
    });
  });

  describe("isPast", () => {
    it("should return true for past date", () => {
      expect(dateUtils.isPast(testDate)).toBe(true);
    });
  });

  describe("isFuture", () => {
    it("should return false for past date", () => {
      expect(dateUtils.isFuture(testDate)).toBe(false);
    });
  });

  describe("isLeapYearFn", () => {
    it("should return true for leap year", () => {
      const leapDate = new Date("2024-06-15T10:30:45.000Z");
      expect(dateUtils.isLeapYearFn(leapDate)).toBe(true);
    });

    it("should return false for non-leap year", () => {
      expect(dateUtils.isLeapYearFn(testDate)).toBe(false);
    });
  });

  describe("isCurrentMonth", () => {
    it("should return false for past month", () => {
      expect(dateUtils.isCurrentMonth(testDate)).toBe(false);
    });
  });

  describe("getWeekDays", () => {
    it("should return 7 days of the week", () => {
      const result = dateUtils.getWeekDays(testDate);
      expect(result).toHaveLength(7);
      expect(result[0]).toEqual(new Date("2023-06-12T10:30:45.000Z"));
    });

    it("should handle custom start of week", () => {
      const result = dateUtils.getWeekDays(testDate, 0);
      expect(result).toHaveLength(7);
      expect(result[0]).toEqual(new Date("2023-06-11T10:30:45.000Z"));
    });
  });

  describe("getMonthDays", () => {
    it("should return all days in month", () => {
      const result = dateUtils.getMonthDays(testDate);
      expect(result).toHaveLength(30);
      expect(result[0]).toEqual(new Date("2023-06-01T00:00:00.000Z"));
    });

    it("should handle leap year February", () => {
      const leapDate = new Date("2024-02-15T10:30:45.000Z");
      const result = dateUtils.getMonthDays(leapDate);
      expect(result).toHaveLength(29);
    });
  });

  describe("differenceInDays", () => {
    it("should calculate difference in days", () => {
      const result = dateUtils.differenceInDays(testDate2, testDate);
      expect(result).toBe(5);
    });
  });

  describe("differenceInWeeks", () => {
    it("should calculate difference in weeks", () => {
      const date1 = new Date("2023-06-01T10:30:45.000Z");
      const date2 = new Date("2023-06-15T10:30:45.000Z");
      const result = dateUtils.differenceInWeeks(date2, date1);
      expect(result).toBe(2);
    });
  });

  describe("differenceInMonths", () => {
    it("should calculate difference in months", () => {
      const date1 = new Date("2023-04-15T10:30:45.000Z");
      const date2 = new Date("2023-06-15T10:30:45.000Z");
      const result = dateUtils.differenceInMonths(date2, date1);
      expect(result).toBe(2);
    });
  });

  describe("differenceInYears", () => {
    it("should calculate difference in years", () => {
      const date1 = new Date("2021-06-15T10:30:45.000Z");
      const date2 = new Date("2023-06-15T10:30:45.000Z");
      const result = dateUtils.differenceInYears(date2, date1);
      expect(result).toBe(2);
    });
  });

  describe("differenceInHours", () => {
    it("should calculate difference in hours", () => {
      const result = dateUtils.differenceInHours(testDate2, testDate);
      expect(result).toBe(125);
    });
  });

  describe("differenceInMinutes", () => {
    it("should calculate difference in minutes", () => {
      const date1 = new Date("2023-06-15T10:30:45.000Z");
      const date2 = new Date("2023-06-15T11:00:45.000Z");
      const result = dateUtils.differenceInMinutes(date2, date1);
      expect(result).toBe(30);
    });
  });

  describe("formatTime", () => {
    it("should format time with default format", () => {
      const result = dateUtils.formatTime(testDate);
      expect(result).toBe("10:30");
    });

    it("should format time with custom format", () => {
      const result = dateUtils.formatTime(testDate, "HH:mm:ss");
      expect(result).toBe("10:30:45");
    });
  });

  describe("formatDateTime", () => {
    it("should format datetime with default format", () => {
      const result = dateUtils.formatDateTime(testDate);
      expect(result).toBe("2023-06-15 10:30");
    });

    it("should format datetime with custom format", () => {
      const result = dateUtils.formatDateTime(testDate, "DD/MM/YYYY HH:mm:ss");
      expect(result).toBe("15/06/2023 10:30:45");
    });
  });

  describe("setTimezone", () => {
    it("should set timezone", () => {
      const result = dateUtils.setTimezone(testDate, "America/New_York");
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("getTimezone", () => {
    it("should get timezone offset", () => {
      const result = dateUtils.getTimezone(testDate);
      expect(result).toBe("+00:00");
    });
  });

  describe("toUTC", () => {
    it("should convert to UTC", () => {
      const result = dateUtils.toUTC(testDate);
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("fromUTC", () => {
    it("should convert from UTC", () => {
      const result = dateUtils.fromUTC(testDate);
      expect(result).toBeInstanceOf(Date);
    });
  });
});
