import * as React from "react";
import HourListingItem from "./HourListingItem";
import { DayOfWeek, WeeklyOpenHours, DayOfWeekArr } from "./types";

type HourListingProps = {
  weeklyOpenHours: WeeklyOpenHours;
};

const HourListing: React.FunctionComponent<HourListingProps> = ({
  weeklyOpenHours
}) => {
  const sorter = (wd1: DayOfWeek, wd2: DayOfWeek) =>
    DayOfWeekArr.indexOf(wd1) - DayOfWeekArr.indexOf(wd2);
  return (
    <ul>
      {Object.keys(weeklyOpenHours)
        .map((m) => m as DayOfWeek)
        .sort(sorter)
        .map((weekday) => (
          <HourListingItem
            weekday={weekday}
            openHoursCurrentDay={weeklyOpenHours[weekday]}
          />
        ))}
    </ul>
  );
};

export default HourListing;
