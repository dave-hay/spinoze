import {
    getDay,
    getDate,
    getWeek,
    getMonth,
    getYear,
    lastDayOfWeek,
    lastDayOfMonth,
    lastDayOfYear,
    formatISO,
} from 'date-fns';

/**
 * Return 10 digit string
 * '2022-05-09'
 */
export const todaysDateAsString = () => {
    const date = new Date();
    return date.toISOString().substring(0, 10);
}

/**
 * Return Object with number properties day, month, year
 * @param stringDate 'YYYY-DD-MM'
 */
export const dateFromStringToNums = (stringDate: string) => {
    const day = Number(stringDate.substring(5, 7))
    const month = Number(stringDate.substring(8, 10))
    const year = Number(stringDate.substring(0, 4))
    return {day, month, year}
}

interface DateObj {
    day: number;
    date: number;
    week: number;
    month: number;
    year: number;
}

/**
 * Return Object with number properties day, week, month, year
 * @param dateStr
 * @property {string} due_full - date as 'YYYY-MM-DD'
 * day -> day of week 1 = Sunday, 2 = Monday, etc
 * date -> day of month 1 = January, 2 = Feb, etc
 * week -> week of year
 * month -> 1-12
 */
export const dateToObj = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const due_full = String(formatISO(dateObj, { representation: 'date' }));
    const due_dow = Number(getDay(dateObj)) + 1;
    const due_day = Number(getDate(dateObj));
    const due_week = Number(getWeek(dateObj));
    const due_month = Number(getMonth(dateObj) + 1);
    const due_year = Number(getYear(dateObj));
    return {due_full, due_dow, due_day, due_week, due_month, due_year}
}

/**
 * check what time category it's in then set appropriate due date
 * TODO add test
 */
export const dueDateFromUrl = (path: string) => {
    const todaysDate = new Date();
    let ans;

    switch (path) {
        case 'month':
            ans = lastDayOfMonth(todaysDate);
            break;
        case 'year':
            ans = lastDayOfYear(todaysDate);
            break;
        case 'week':
            ans = lastDayOfWeek(todaysDate);
            break;
        default:
            ans = todaysDate;
    }

    return ans;
}
