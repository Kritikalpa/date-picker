import React from "react";
import { DateType } from "../utils/types";
import { monthNames } from "../utils/constants";
import "../stylesheets/CalendarActions.css";

const CalendarActions: React.FC<{
  currentDate: DateType;
  setCurrentDate: React.Dispatch<React.SetStateAction<DateType>>;
}> = ({ currentDate, setCurrentDate }) => {
  const handlePrevMonth = () => {
    let { year, month } = currentDate;
    if (month === 0) {
      month = 11;
      year -= 1;
    } else {
      month -= 1;
    }
    setCurrentDate({ ...currentDate, year, month });
  };

  const handleNextMonth = () => {
    let { year, month } = currentDate;
    if (month === 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    }
    setCurrentDate({ ...currentDate, year, month });
  };
  return (
    <div className="calendar-header-wrapper">
      <div onClick={handlePrevMonth}>&lt;</div>
      <div>{monthNames[currentDate?.month] + ", " + currentDate?.year}</div>
      <div onClick={handleNextMonth}>&gt;</div>
    </div>
  );
};

export default CalendarActions;
