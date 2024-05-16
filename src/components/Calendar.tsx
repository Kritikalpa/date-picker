import React, { useEffect, useState } from "react";
import { getDaysInMonth, isWeekend } from "../utils/function";
import { DateRange, DateType } from "../utils/types";
import "../stylesheets/Calendar.css";

const Calendar: React.FC<{
  currentDate: DateType;
  selectedRange: DateRange;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRange>>;
}> = ({ currentDate, selectedRange, setSelectedRange }) => {
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const daysInMonth = getDaysInMonth(currentDate.year, currentDate.month);

  const handleDateSelect = (date: number) => {
    if (selectedRange.start) {
      if (
        new Date(currentDate.year, currentDate.month, date) <
        new Date(
          selectedRange.start.year,
          selectedRange.start.month,
          selectedRange.start.day
        )
      ) {
        setSelectedRange((prev) => ({
          start: {
            year: currentDate.year,
            month: currentDate.month,
            day: date,
          },
          end: prev.start,
        }));
        return;
      }
      setSelectedRange((prev) => ({
        ...prev,
        end: { year: currentDate.year, month: currentDate.month, day: date },
      }));
    } else {
      setSelectedRange((prev) => ({
        ...prev,
        start: { year: currentDate.year, month: currentDate.month, day: date },
      }));
    }
  };

  useEffect(() => {
    if (selectedRange.start && selectedRange.end) {
      return;
    }
    if (
      selectedRange.start &&
      hoveredDate &&
      new Date(currentDate.year, currentDate.month, hoveredDate) <
        new Date(
          selectedRange.start.year,
          selectedRange.start.month,
          selectedRange.start.day
        )
    ) {
      setSelectedRange((prev) => ({
        start: null,
        end: prev.start,
      }));
    } else if (
      selectedRange.end &&
      hoveredDate &&
      new Date(currentDate.year, currentDate.month, hoveredDate) >
        new Date(
          selectedRange.end.year,
          selectedRange.end.month,
          selectedRange.end.day
        )
    ) {
      setSelectedRange((prev) => ({
        start: prev.end,
        end: null,
      }));
    }
  }, [hoveredDate]);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">Su</div>
      <div className="calendar-header">Mo</div>
      <div className="calendar-header">Tu</div>
      <div className="calendar-header">We</div>
      <div className="calendar-header">Th</div>
      <div className="calendar-header">Fr</div>
      <div className="calendar-header">Sa</div>
      {daysInMonth.map((curr) => (
        <div
          className={`calendar-dates${
            curr.disabled ||
            isWeekend(new Date(currentDate.year, currentDate.month, curr.date))
              ? " disabled"
              : ""
          }${
            !curr.disabled &&
            ((hoveredDate &&
              ((selectedRange.start &&
                !selectedRange.end &&
                ((currentDate.month === selectedRange.start?.month &&
                  curr.date > selectedRange.start?.day &&
                  curr.date < hoveredDate) ||
                  (currentDate.month > selectedRange.start?.month &&
                    curr.date < hoveredDate))) ||
                (!selectedRange.start &&
                  selectedRange.end &&
                  ((currentDate.month === selectedRange.end?.month &&
                    curr.date < selectedRange.end?.day &&
                    curr.date > hoveredDate) ||
                    (currentDate.month < selectedRange.end?.month &&
                      curr.date > hoveredDate))))) ||
              (selectedRange.start &&
                selectedRange.end &&
                new Date(currentDate.year, currentDate.month, curr.date) >
                  new Date(
                    selectedRange.start?.year,
                    selectedRange.start?.month,
                    selectedRange.start?.day
                  ) &&
                new Date(currentDate.year, currentDate.month, curr.date) <
                  new Date(
                    selectedRange.end?.year,
                    selectedRange.end?.month,
                    selectedRange.end?.day
                  )))
              ? " calendar-date-selection"
              : ""
          }`}
        >
          <span
            className={`${
              new Date(
                currentDate.year,
                currentDate.month,
                curr.date
              ).toDateString() === new Date().toDateString()
                ? "calendar-date-today"
                : ""
            }${
              !curr.disabled &&
              ((selectedRange.start &&
                new Date(
                  selectedRange.start?.year,
                  selectedRange.start?.month,
                  selectedRange.start?.day
                ).toDateString() ===
                  new Date(
                    currentDate.year,
                    currentDate.month,
                    curr.date
                  ).toDateString()) ||
                (selectedRange.end &&
                  new Date(
                    selectedRange.end?.year,
                    selectedRange.end?.month,
                    selectedRange.end?.day
                  ).toDateString() ===
                    new Date(
                      currentDate.year,
                      currentDate.month,
                      curr.date
                    ).toDateString()))
                ? " calendar-date-range"
                : ""
            }`}
            onClick={() => handleDateSelect(curr.date)}
            onMouseEnter={() => {
              setHoveredDate(curr.date);
            }}
            onMouseLeave={() => {
              setHoveredDate(null);
            }}
          >
            {curr.date}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
