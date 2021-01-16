import * as React from "react";
import { OpenHourItem } from "./types";
import { startOfDay, addSeconds, format } from "date-fns";

type HourListingItemProp = {
  weekday: string;
  openHoursCurrentDay: OpenHourItem[][];
};

const getHourInday = (lapseFromDayStartInSec: number) =>
  format(addSeconds(startOfDay(Date.now()), lapseFromDayStartInSec), "h a");

const HourListingItem: React.FunctionComponent<HourListingItemProp> = ({
  weekday,
  openHoursCurrentDay
}) => {
  const isClosed = openHoursCurrentDay.length === 0;
  const isToday =
    format(Date.now(), "EEEE").toLowerCase() === weekday.toLowerCase();

  const displayString = openHoursCurrentDay
    .map((segment) =>
      segment.map((mark) => getHourInday(mark.value)).join(" - ")
    )
    .join(", ");

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <strong className="capitalize">{weekday}</strong>
          {isToday ? (
            <span className="uppercase font-bold text-green-500 ml-4">
              Today
            </span>
          ) : null}
        </div>
        {isClosed ? (
          <span className="text-gray-500">Closed</span>
        ) : (
          displayString
        )}
      </div>
      <hr className="my-2" />
    </div>
  );
};

export default HourListingItem;
