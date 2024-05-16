export type DateType = {
  year: number;
  month: number;
  day: number;
};

export type DateRange = {
  start: DateType | null;
  end: DateType | null;
};
