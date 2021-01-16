import {
  WeeklyOpenHours,
  OpenHourItemWithWeekday,
  DayOfWeekArr,
  DayOfWeek
} from "./types";
import chunk from "lodash.chunk";
import difference from "lodash.difference";

function rorateRight<T>(arr: T[], step: number): T[] {
  for (let i = 0; i < step; i++) {
    arr.push(arr.shift()!);
  }
  return arr;
}

export function mapToOpenSegments(openHours: WeeklyOpenHours) {
  const sortedByDayAndHour = (
    a: OpenHourItemWithWeekday,
    b: OpenHourItemWithWeekday
  ) => {
    const byWDay =
      DayOfWeekArr.indexOf(a.weekday) - DayOfWeekArr.indexOf(b.weekday);
    return byWDay || a.value - b.value;
  };
  const timeMarkSeries = Object.keys(openHours)
    .map((wd) => wd as DayOfWeek)
    .flatMap((weekday) => {
      const timeMarks = openHours[weekday];
      return timeMarks.map((mark) => ({ ...mark, weekday }));
    })
    .sort(sortedByDayAndHour);

  const firstOpenMarkInSeries = timeMarkSeries.findIndex(
    (mark) => mark.type === "open"
  );

  const markSegments = chunk(
    rorateRight(timeMarkSeries, firstOpenMarkInSeries),
    2
  );

  const markSegmentsGroupedByWeekday = markSegments.reduce((curr, next) => {
    const [openMark] = next;
    const wDay = openMark.weekday;

    if (!curr[wDay]) {
      curr[wDay] = [next];
    } else {
      curr[wDay].push(next);
    }
    return curr;
  }, {} as WeeklyOpenHours);

  const closedDays = difference(
    DayOfWeekArr,
    Object.keys(markSegmentsGroupedByWeekday).map((wd) => wd as DayOfWeek)
  );

  closedDays.forEach(
    (closedDay) => (markSegmentsGroupedByWeekday[closedDay] = [])
  );

  return markSegmentsGroupedByWeekday;
}
