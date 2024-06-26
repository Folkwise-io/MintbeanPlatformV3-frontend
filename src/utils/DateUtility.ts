import moment from "moment-timezone";
import humanizeDuration from "humanize-duration";

// 'wc' = 'wallclock'

interface wcToClientOptions {
  clientRegion?: string;
}

interface wcToClientStrOptions extends wcToClientOptions {
  format?: string;
}
// Format strings follow moment rules: https://momentjs.com/docs/#/parsing/string-format/
const DEFAULT_DATE_FORMAT = "llll z"; // "Thu, Oct 15, 2020 12:00 PM EST"

// Builds a moment object with time for client region based on master wallclock time & region. Guesses client region if not provided
export const wcToClient = (wcStr: string, masterRegion: string, opts: wcToClientOptions = {}): moment.Moment => {
  const { clientRegion = moment.tz.guess() } = opts;
  return moment.tz(wcStr, masterRegion).tz(clientRegion);
};
// Renders client date in human friendly string. Guesses client region if not provided
export const wcToClientStr = (wcStr: string, masterRegion: string, opts: wcToClientStrOptions = {}): string => {
  const { clientRegion = moment.tz.guess(), format = DEFAULT_DATE_FORMAT } = opts;
  return moment
    .tz(wcStr, masterRegion)
    .tz(clientRegion)
    .format(format || DEFAULT_DATE_FORMAT);
};
/* Returns UTC date based on input wallclock time and region.
    Useful for sorting dates accross multiple regions */
export const wcToUTC = (wcStr: string, masterRegion: string): Date => {
  return moment.tz(wcStr, masterRegion).utc().toDate();
};
/*Returns the hour differences between two datetime strings, assuming start/end is in same region
   (input string example: '2020-10-15T13:00:00.000') */
export const getDurationInHours = (startTime: string, endTime: string): number => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  return hoursDifference(endDate, startDate);
};
// Returns a humanized string of a duration using momentjs's humanize() function
export const getDurationStringFromHours = (numberOfHours: number): string => {
  return humanizeDuration(numberOfHours * 60 * 60 * 1000, {
    largest: 2,
    round: true,
    units: ["mo", "w", "d", "h", "m"],
  });
};
// Returns relative time string from client region's perspective. Client region is guessed if not provided
export const fromNow = (wcStr: string, masterRegion: string, clientRegion?: string): string => {
  if (clientRegion === undefined) clientRegion = moment.tz.guess();
  return moment.tz(wcStr, masterRegion).tz(clientRegion).fromNow();
};
// Returns true if date is in future relative to client @ now. Client region is guessed if not provided
export const isPast = (wcStr: string, masterRegion: string): boolean => {
  const targetDate = moment.tz(wcStr, masterRegion);
  const now = moment();
  return targetDate.isBefore(now);
};
// Returns true if moment is between date1 and date2 assuming both in same region (format: '2020-10-15T13:00' or '2020-10-15T13:00' )
export const isCurrent = (date1: string, date2: string): boolean => {
  const now = moment();
  return now.isBetween(date1, date2);
};

// Returns true if date1 is chronologically prior to date2 assuming both in same region (format: '2020-10-15T13:00' or '2020-10-15T13:00' )
export const isChronologicalNoTz = (timestamp1: string, timestamp2: string): boolean => {
  if (!validateTimestamps([timestamp1, timestamp2])) return false;
  // Timezone is irrelevant
  const d1 = new Date(timestamp1);
  const d2 = new Date(timestamp2);
  return d1 < d2;
};

// Returns true if strings in arg matche format: '2020-10-15T13:00:00.000'
export const validateTimestamps = (datestrInput: string | string[]): boolean => {
  if (Array.isArray(datestrInput) && !datestrInput.length) return false;
  if (typeof datestrInput === "string") {
    datestrInput = [datestrInput];
  }
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}\.\d{3})?$/;
  const results = datestrInput.map((d) => (d.match(pattern) ? true : false));
  return !results.includes(false);
};

const hoursDifference = (start: Date, end: Date): number => {
  let difference = (end.getTime() - start.getTime()) / 1000; // to seconds
  difference /= 60 * 60; // to hours
  return Math.abs(parseFloat(difference.toFixed(2))); // to hours integer, up to two decimal places
};
