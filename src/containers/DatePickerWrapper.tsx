import React, { useEffect, useState } from "react";
import { DateRange, DateType } from "../utils/types";
import Calendar from "../components/Calendar";
import CalendarActions from "../components/CalendarActions";
import "../stylesheets/DatePicker.css";
import PredefinedRanges from "../components/PredefinedRanges";
import DateRangeViewer from "../components/DateRangeViewer";
import { getDatesInRange, isWeekend } from "../utils/function";

type DateArray = Array<string[]>;

const DatePickerWrapper: React.FC<{ onChange: (dates: DateArray) => void }> = ({
  onChange,
}) => {
  const [currentDate, setCurrentDate] = useState<DateType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  });

  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  useEffect(() => {
    if (selectedRange.start && selectedRange.end) {
      const result = [
        [
          `${selectedRange.start.year}-${(selectedRange.start.month + 1)
            .toString()
            .padStart(2, "0")}-${selectedRange.start.day
            .toString()
            .padStart(2, "0")}`,
          `${selectedRange.end.year}-${(selectedRange.end.month + 1)
            .toString()
            .padStart(2, "0")}-${selectedRange.end.day
            .toString()
            .padStart(2, "0")}`,
        ],
      ];
      const datesInRange = getDatesInRange(
        new Date(
          selectedRange.start.year,
          selectedRange.start.month,
          selectedRange.start.day
        ),
        new Date(
          selectedRange.end.year,
          selectedRange.end.month,
          selectedRange.end.day
        )
      );
      const weekends = datesInRange
        .filter((date) => isWeekend(date))
        .map(
          (date) =>
            `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
        );

      result.push(weekends);

      // console.log(result);

      onChange(result);
    }
  }, [selectedRange]);

  return (
    <div className="date-picker-wrapper">
      <PredefinedRanges setSelectedRange={setSelectedRange} />
      <div>
        <div className="date-picker-header">
          <DateRangeViewer selectedRange={selectedRange} />
          <div
            className="date-picker-reset"
            onClick={() => {
              setSelectedRange({
                start: null,
                end: null,
              });
            }}
          >
            x
          </div>
        </div>
        <CalendarActions
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <Calendar
          currentDate={currentDate}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      </div>
    </div>
  );
};

export default DatePickerWrapper;
