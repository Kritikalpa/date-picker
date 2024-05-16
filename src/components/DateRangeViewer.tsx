import React from "react";
import { DateRange } from "../utils/types";
import "../stylesheets/DateRange.css";

const DateRangeViewer: React.FC<{ selectedRange: DateRange }> = ({
  selectedRange,
}) => {
  return (
    <div className="date-range-viewer">
      <div>
        {selectedRange.start
          ? `${selectedRange.start.year}-${selectedRange.start.month
              .toString()
              .padStart(2, "0")}-${selectedRange.start.day
              .toString()
              .padStart(2, "0")}`
          : "YYYY-MM-DD"}
      </div>
      ~
      <div>
        {selectedRange.end
          ? `${selectedRange.end.year}-${selectedRange.end.month
              .toString()
              .padStart(2, "0")}-${selectedRange.end.day
              .toString()
              .padStart(2, "0")}`
          : "YYYY-MM-DD"}
      </div>
    </div>
  );
};

export default DateRangeViewer;
