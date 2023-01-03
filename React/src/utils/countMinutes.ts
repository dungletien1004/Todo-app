import moment from 'moment';
export const countMinutes = (_day1: string, _day2: string): number => {
  const day1 = moment(_day1);
  const day2 = moment(_day2);
  return day2.diff(day1, 'minutes');
};
