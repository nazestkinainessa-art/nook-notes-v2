export const getCalendarData = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const startsFrom = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array(42).fill(null);

  return {
    daysArray,
    startsFrom,
    daysInMonth,
  };
};
