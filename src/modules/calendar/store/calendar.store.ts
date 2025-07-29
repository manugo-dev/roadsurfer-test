import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { DEFAULT_DATE_FORMAT } from "@/modules/core/constants/date";
import { now, addDays, formatDate, getWeekDays, startOfWeek } from "@/modules/shared/utils/date";

export const useCalendarStore = defineStore("calendar", () => {
  const currentDate = ref(new Date());
  const viewType = ref("week");

  const currentWeek = computed(() => {
    return getWeekDays(currentDate.value);
  });

  const currentWeekLabel = computed(() => {
    const start = currentWeek.value[0];
    const end = currentWeek.value[currentWeek.value.length - 1];
    return `${formatDate(start, DEFAULT_DATE_FORMAT)} - ${formatDate(end, DEFAULT_DATE_FORMAT)}`;
  });

  const setCurrentDate = (date: Date) => {
    currentDate.value = new Date(date);
  };

  const goToToday = () => {
    const todayWeekStart = startOfWeek(now());
    setCurrentDate(todayWeekStart);
  };

  const goToNextWeek = () => {
    const nextWeek = addDays(currentDate.value, 7);
    setCurrentDate(nextWeek);
  };

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate.value);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const goToDateWeek = (date: Date) => {
    const weekStart = startOfWeek(date);
    setCurrentDate(weekStart);
  };

  return {
    currentWeek,
    currentWeekLabel,
    viewType,

    goToToday,
    goToNextWeek,
    goToPreviousWeek,
    goToDateWeek,
  };
});
