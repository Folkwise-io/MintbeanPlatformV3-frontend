import moment from "moment-timezone";

// 'wc' = 'wallclock'

interface wcToClientOptions {
  clientRegion?: string;
}

interface wcToClientStrOptions extends wcToClientOptions {
  format?: string;
}
// Format strings follow moment rules: https://momentjs.com/docs/#/parsing/string-format/
const DEFAULT_DATE_FORMAT = "llll z"; // "Thu, Oct 15, 2020 12:00 PM EST"

export class DateUtility {
  // Builds a moment object with time for client region based on master wallclock time & region. Guesses client region if not provided
  wcToClient = (wcStr: string, masterRegion: string, opts: wcToClientOptions = {}): moment.Moment => {
    const { clientRegion = moment.tz.guess() } = opts;
    return moment.tz(wcStr, masterRegion).tz(clientRegion);
  };
  // Renders client date in human friendly string. Guesses client region if not provided
  wcToClientStr = (wcStr: string, masterRegion: string, opts: wcToClientStrOptions = {}): string => {
    const { clientRegion = moment.tz.guess(), format = DEFAULT_DATE_FORMAT } = opts;
    return moment
      .tz(wcStr, masterRegion)
      .tz(clientRegion)
      .format(format || DEFAULT_DATE_FORMAT);
  };
  /* Returns UTC date based on input wallclock time and region.
    Useful for sorting dates accross multiple regions */
  wcToUTC = (wcStr: string, masterRegion: string): Date => {
    return moment.tz(wcStr, masterRegion).utc().toDate();
  };
  /*Returns the hour differences between two datetime strings, assuming start/end is in same region
   (input string example: '2020-10-15T13:00:00.000') */
  getDuration = (startTime: string, endTime: string): number => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    return hoursDifference(endDate, startDate);
  };
  // Returns relative time string from client region's perspective. Client region is guessed if not provided
  fromNow = (wcStr: string, masterRegion: string, clientRegion?: string) => {
    if (clientRegion === undefined) clientRegion = moment.tz.guess();
    return moment.tz(wcStr, masterRegion).tz(clientRegion).fromNow();
  };
  // Returns true if date is in future relative to client @ now. Client region is guessed if not provided
  isPast = (wcStr: string, masterRegion: string, clientRegion?: string): boolean => {
    if (clientRegion === undefined) clientRegion = moment.tz.guess();
    const targetDate = moment.tz(wcStr, masterRegion).tz(clientRegion);
    const now = moment(new Date()).utc();
    return now > targetDate;
  };
  // Returns true if date is in future relative to client @ now. Client region is guessed if not provided
  isFuture = (wcStr: string, masterRegion: string, clientRegion?: string): boolean => {
    if (clientRegion === undefined) clientRegion = moment.tz.guess();
    const targetDate = moment.tz(wcStr, masterRegion).tz(clientRegion).utc();
    const now = moment(new Date()).utc();
    return now < targetDate;
  };
}

const hoursDifference = (start: Date, end: Date): number => {
  let difference = (end.getTime() - start.getTime()) / 1000; // to seconds
  difference /= 60 * 60; // to hours
  return Math.abs(parseFloat(difference.toFixed(2))); // to hours integer, up to two decimal places
};
