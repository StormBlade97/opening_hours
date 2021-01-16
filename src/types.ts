export const DayOfWeekArr = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
] as const;

type DOW = typeof DayOfWeekArr;
export type DayOfWeek = DOW[number];

export type OpenHourItem = {
  type: "open" | "close";
  value: number;
  weekday: DayOfWeek;
};

export type OpenHourItemWithWeekday = OpenHourItem & { weekday: DayOfWeek };

export type WeeklyOpenHours = {
  [k in DayOfWeek]: OpenHourItem[];
};
