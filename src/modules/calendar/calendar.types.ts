export interface CalendarEvent {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
}

export interface WeekDay {
  name: string;
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
}
