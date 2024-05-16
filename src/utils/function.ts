type CalendarDates = {
  date: number;
  disabled: boolean;
};

export const getDaysInMonth = (
  year: number,
  month: number
): Array<CalendarDates> => {
  const date = new Date(year, month, 1);
  const days: Array<CalendarDates> = [];
  const startDay = date.getDay();
  for (let i = 0; i < startDay; i++) {
    days.unshift({ date: new Date(year, month, -i).getDate(), disabled: true });
  }
  while (date.getMonth() === month) {
    days.push({ date: date.getDate(), disabled: false });
    date.setDate(date.getDate() + 1);
  }
  while (date.getDay() !== 0) {
    days.push({ date: date.getDate(), disabled: true });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const isWeekend = (date: Date): boolean => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const getDatesInRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(start);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
