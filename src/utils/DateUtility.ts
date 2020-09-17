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
  // Builds a moment object with time for client region based on master time & region. Guesses client region if not provided
  wcToClient = (wallclockStr: string, masterRegion: string, opts: wcToClientOptions): moment.Moment => {
    const { clientRegion = moment.tz.guess() } = opts;
    return moment.tz(wallclockStr, masterRegion).tz(clientRegion);
  };
  // Renders client date in human friendly string. Guesses client region if not provided
  wcToClientStr = (wallclockStr: string, masterRegion: string, opts: wcToClientStrOptions): string => {
    const { clientRegion = moment.tz.guess(), format = DEFAULT_DATE_FORMAT } = opts;
    return moment
      .tz(wallclockStr, masterRegion)
      .tz(clientRegion)
      .format(format || DEFAULT_DATE_FORMAT);
  };
  /* Returns UTC date based on input wallclock time and region.
    Useful for sorting dates accross multiple regions */
  wcToUTC = (wallclockStr: string, masterRegion: string): Date => {
    return moment.tz(wallclockStr, masterRegion).utc().toDate();
  };
  /*Calculates the hour differences between two datetime strings, assuming start/end is in same region
   (datetime string example: '2020-10-15T13:00:00.000') */
  getDuration = (startTime: string, endTime: string): number => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    return hoursDifference(endDate, startDate);
  };
  // Returns 'timeago' or 'intime' string from client region's perspective. Client region is guessed if not provided
  fromNow = (
    wallclockStr: string,
    masterRegion: string,
    { clientRegion = moment.tz.guess() }: { clientRegion?: string },
  ): string => {
    return moment.tz(wallclockStr, masterRegion).tz(clientRegion).fromNow();
  };
  // Returns true if date is in past relative to client @ now
  isPast = (
    wallclockStr: string,
    masterRegion: string,
    { clientRegion = moment.tz.guess() }: { clientRegion?: string },
  ): boolean => {
    const targetDate = moment.tz(wallclockStr, masterRegion).tz(clientRegion);
    const now = moment(new Date());
    return now > targetDate;
  };
  // Returns true if date is in future relative to client @ now
  isFuture = (
    wallclockStr: string,
    masterRegion: string,
    { clientRegion = moment.tz.guess() }: { clientRegion?: string },
  ): boolean => {
    const targetDate = moment.tz(wallclockStr, masterRegion).utc();
    const now = moment(new Date()).utc();
    return now < targetDate;
  };
}

const hoursDifference = (start: Date, end: Date): number => {
  let difference = (end.getTime() - start.getTime()) / 1000; // to seconds
  difference /= 60 * 60; // to hours
  return Math.abs(parseFloat(difference.toFixed(2))); // hours integer
};

// not sure we need these yet:

// // Returns a moment object with wallclock time for master region
// wcToMaster = (wallclockStr: string, masterRegion: string): moment.Moment => {
//   return moment.tz(wallclockStr, masterRegion);
// };
// // Renders master date in human friendly string
// wcToMasterStr = (wallclockStr: string, masterRegion: string, format?: string): string => {
//   return moment.tz(wallclockStr, masterRegion).format(format || DEFAULT_DATE_FORMAT);
// };
// // Builds a Date with wallclock time for master region (as opposed to user region)
// wcToDate = (wallclockStr: string, masterRegion: string): Date => {
//   return moment.tz(wallclockStr, masterRegion).toDate();
// };
