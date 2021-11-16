import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHoursInUTC(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const hourDifference = dayjs(end_date_utc).diff(start_date_utc, 'hours');
    return hourDifference;
  }

  private convertToUTC(date: Date): string {
    const dateUTC = dayjs(date).utc().local().format();

    return dateUTC;
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    const hourDifference = dayjs(end_date_utc).diff(start_date_utc, 'days');
    return hourDifference;
  }

  addDays(days: number): Date {
    const date = dayjs().add(days, 'days').toDate();

    return date;
  }

  addHours(hours: number): Date {
    const date = dayjs().add(hours, 'hour').toDate();

    return date;
  }

  isBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
