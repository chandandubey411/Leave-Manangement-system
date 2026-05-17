const { differenceInCalendarDays, parseISO, startOfDay } = require('date-fns');

const calculateLeaveDays = (startDate, endDate) => {
  const start = startOfDay(parseISO(startDate));
  const end = startOfDay(parseISO(endDate));
  
  if (end < start) {
    throw new Error('End date cannot be before start date');
  }

  // Adding 1 because leave is inclusive of both start and end dates
  return differenceInCalendarDays(end, start) + 1;
};

module.exports = calculateLeaveDays;
