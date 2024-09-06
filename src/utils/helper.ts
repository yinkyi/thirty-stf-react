import dayjs, { Dayjs } from 'dayjs';
import { QueryClient } from 'react-query';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });

// Type for the date parameters
type DateParam = Dayjs | string | null;

// Helper function to ensure the parameter is a Dayjs object
const toDayjs = (date: DateParam): Dayjs => {
  return dayjs(date);
};

export const disabledStartDate = (current: DateParam, end_date?: DateParam): boolean => {
  const currentDayjs = toDayjs(current);
  const endDateDayjs = end_date ? toDayjs(end_date) : null;

  return endDateDayjs
    ? currentDayjs.isBefore(dayjs().subtract(1, 'day')) || currentDayjs.isAfter(endDateDayjs)
    : currentDayjs.isBefore(dayjs().subtract(1, 'day'));
};

export const disabledEndDate = (current: DateParam, start_date?: DateParam): boolean => {
  const currentDayjs = toDayjs(current);
  const startDayjs = start_date ? toDayjs(start_date) : null;

  if (startDayjs) {
    return currentDayjs.isBefore(startDayjs);
  }

  return currentDayjs.isBefore(dayjs().subtract(1, 'day'));
};

export const queryClient = new QueryClient();

export const numberFormat = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
