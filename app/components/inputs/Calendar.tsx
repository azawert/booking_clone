"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface ICalendarProps {
  value: Range | null;
  onChange: (val: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export const Calendar: React.FC<ICalendarProps> = ({
  onChange,
  value,
  disabledDates,
}) => {
  return (
    <DateRange
      disabledDates={disabledDates}
      rangeColors={["#262626"]}
      ranges={value ? [value] : []}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      minDate={new Date()}
      showDateDisplay={false}
    />
  );
};
