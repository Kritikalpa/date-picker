import React from "react";
import "../stylesheets/PredefinedRanges.css";
import { DateRange } from "../utils/types";

const PredefinedRanges: React.FC<{
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRange>>;
}> = ({ setSelectedRange }) => {
  const handleRange = (duration: number, isPrev: boolean) => {
    const currentDate = new Date();
    const calcDate = new Date(currentDate);

    if (isPrev) {
      calcDate.setDate(currentDate.getDate() - duration);
      setSelectedRange({
        start: {
          year: calcDate.getFullYear(),
          month: calcDate.getMonth(),
          day: calcDate.getDate(),
        },
        end: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
      });
    } else {
      calcDate.setDate(currentDate.getDate() + duration);
      setSelectedRange({
        end: {
          year: calcDate.getFullYear(),
          month: calcDate.getMonth(),
          day: calcDate.getDate(),
        },
        start: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
      });
    }
  };

  return (
    <div className="ranges-wrapper">
      <ul>
        <li
          onClick={() => {
            handleRange(7, true);
          }}
        >
          Last 7 days
        </li>
        <li
          onClick={() => {
            handleRange(30, true);
          }}
        >
          Last 30 days
        </li>
        <li
          onClick={() => {
            handleRange(7, false);
          }}
        >
          Next 7 days
        </li>
      </ul>
    </div>
  );
};

export default PredefinedRanges;
