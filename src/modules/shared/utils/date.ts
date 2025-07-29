import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { DEFAULT_DATE_TIME_FORMAT } from "@/modules/core/constants/date";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);

export type DateValue = string | number | Date;
export type DateUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";

export const parseDate = (value: DateValue): Date => dayjs(value).toDate();
export const formatDate = (value: DateValue, format = DEFAULT_DATE_TIME_FORMAT): string => dayjs(value).format(format);
export const now = (): Date => dayjs().toDate();

export const addDays = (date: DateValue, amount: number): Date => dayjs(date).add(amount, "day").toDate();
export const addWeeks = (date: DateValue, amount: number): Date => dayjs(date).add(amount, "week").toDate();
export const addMonths = (date: DateValue, amount: number): Date => dayjs(date).add(amount, "month").toDate();
export const addYears = (date: DateValue, amount: number): Date => dayjs(date).add(amount, "year").toDate();
export const addHours = (date: DateValue, amount: number): Date => dayjs(date).add(amount, "hour").toDate();
export const addMinutes = (date: DateValue, amount: number): Date => dayjs(date).add(amount, "minute").toDate();

export const subtractDays = (date: DateValue, amount: number): Date => dayjs(date).subtract(amount, "day").toDate();
export const subtractWeeks = (date: DateValue, amount: number): Date => dayjs(date).subtract(amount, "week").toDate();
export const subtractMonths = (date: DateValue, amount: number): Date => dayjs(date).subtract(amount, "month").toDate();
export const subtractYears = (date: DateValue, amount: number): Date => dayjs(date).subtract(amount, "year").toDate();

export const isBefore = (a: DateValue, b: DateValue, unit?: DateUnit): boolean => dayjs(a).isBefore(dayjs(b), unit);
export const isAfter = (a: DateValue, b: DateValue, unit?: DateUnit): boolean => dayjs(a).isAfter(dayjs(b), unit);
export const isSameOrBeforeFn = (a: DateValue, b: DateValue, unit?: DateUnit): boolean =>
  dayjs(a).isSameOrBefore(dayjs(b), unit);
export const isSameOrAfterFn = (a: DateValue, b: DateValue, unit?: DateUnit): boolean =>
  dayjs(a).isSameOrAfter(dayjs(b), unit);
export const isSame = (a: DateValue, b: DateValue, unit?: DateUnit): boolean => dayjs(a).isSame(dayjs(b), unit);

export const isSameDay = (a: DateValue, b: DateValue): boolean => isSame(a, b, "day");
export const isSameWeek = (a: DateValue, b: DateValue): boolean => isSame(a, b, "week");
export const isSameMonth = (a: DateValue, b: DateValue): boolean => isSame(a, b, "month");
export const isSameYear = (a: DateValue, b: DateValue): boolean => isSame(a, b, "year");

export const startOfDay = (date: DateValue): Date => dayjs(date).startOf("day").toDate();
export const endOfDay = (date: DateValue): Date => dayjs(date).endOf("day").toDate();
export const startOfWeek = (date: DateValue): Date => dayjs(date).startOf("week").toDate();
export const endOfWeek = (date: DateValue): Date => dayjs(date).endOf("week").toDate();
export const startOfMonth = (date: DateValue): Date => dayjs(date).startOf("month").toDate();
export const endOfMonth = (date: DateValue): Date => dayjs(date).endOf("month").toDate();
export const startOfYear = (date: DateValue): Date => dayjs(date).startOf("year").toDate();
export const endOfYear = (date: DateValue): Date => dayjs(date).endOf("year").toDate();
export const startOf = (date: DateValue, unit: DateUnit): Date => dayjs(date).startOf(unit).toDate();
export const endOf = (date: DateValue, unit: DateUnit): Date => dayjs(date).endOf(unit).toDate();

export const toISOString = (date: DateValue): string => dayjs(date).toISOString();
export const fromISOString = (isoString: string): Date => dayjs(isoString).toDate();

export const getDayOfWeek = (date: DateValue): number => dayjs(date).day();
export const getDayOfMonth = (date: DateValue): number => dayjs(date).date();
export const getMonth = (date: DateValue): number => dayjs(date).month();
export const getYear = (date: DateValue): number => dayjs(date).year();
export const getHour = (date: DateValue): number => dayjs(date).hour();
export const getMinute = (date: DateValue): number => dayjs(date).minute();
export const getSecond = (date: DateValue): number => dayjs(date).second();
export const getDaysInMonth = (date: DateValue): number => dayjs(date).daysInMonth();
export const getWeekOfYear = (date: DateValue): number => dayjs(date).week();

export const isToday = (date: DateValue): boolean => isSameDay(date, now());
export const isTomorrow = (date: DateValue): boolean => isSameDay(date, addDays(now(), 1));
export const isYesterday = (date: DateValue): boolean => isSameDay(date, subtractDays(now(), 1));
export const isPast = (date: DateValue): boolean => isBefore(date, now(), "day");
export const isFuture = (date: DateValue): boolean => isAfter(date, now(), "day");
export const isLeapYearFn = (date: DateValue): boolean => dayjs(date).isLeapYear();
export const isCurrentMonth = (date: DateValue): boolean => getMonth(date) === getMonth(now());

export const getWeekDays = (date: DateValue, startOfWeek = 1): Date[] => {
  const currentWeekday = getDayOfWeek(date);
  const diff = (currentWeekday - startOfWeek + 7) % 7;
  const start = subtractDays(date, diff, "day");
  console.log(date, currentWeekday, startOfWeek, diff, start);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const getMonthDays = (date: DateValue): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days: Date[] = [];
  let current = dayjs(start);

  while (current.isSameOrBefore(dayjs(end), "day")) {
    days.push(current.toDate());
    current = current.add(1, "day");
  }

  return days;
};

export const differenceInDays = (a: DateValue, b: DateValue): number => dayjs(a).diff(dayjs(b), "day");
export const differenceInWeeks = (a: DateValue, b: DateValue): number => dayjs(a).diff(dayjs(b), "week");
export const differenceInMonths = (a: DateValue, b: DateValue): number => dayjs(a).diff(dayjs(b), "month");
export const differenceInYears = (a: DateValue, b: DateValue): number => dayjs(a).diff(dayjs(b), "year");
export const differenceInHours = (a: DateValue, b: DateValue): number => dayjs(a).diff(dayjs(b), "hour");
export const differenceInMinutes = (a: DateValue, b: DateValue): number => dayjs(a).diff(dayjs(b), "minute");

export const formatTime = (date: DateValue, format = "HH:mm"): string => dayjs(date).format(format);
export const formatDateTime = (date: DateValue, format = "YYYY-MM-DD HH:mm"): string => dayjs(date).format(format);

export const setTimezone = (date: DateValue, tz: string): Date => dayjs(date).tz(tz).toDate();
export const getTimezone = (date: DateValue): string => dayjs(date).format("Z");
export const toUTC = (date: DateValue): Date => dayjs(date).utc().toDate();
export const fromUTC = (date: DateValue): Date => dayjs(date).local().toDate();
