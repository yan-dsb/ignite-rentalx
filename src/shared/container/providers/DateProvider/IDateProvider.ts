interface IDateProvider {
  compareInHoursInUTC(start_date: Date, end_date: Date): number;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
