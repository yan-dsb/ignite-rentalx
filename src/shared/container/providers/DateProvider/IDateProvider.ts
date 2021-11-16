interface IDateProvider {
  compareInHoursInUTC(start_date: Date, end_date: Date): number;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}

export { IDateProvider };
