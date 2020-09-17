import moment from "moment-timezone";

interface wcToClientStrOptions {
  format?: string;
  clientRegion?: string;
}
// 'wc' = 'wallclock'

// Format strings follow moment rules: https://momentjs.com/docs/#/parsing/string-format/
const DEFAULT_DATE_FORMAT = "llll z"; // "Thu, Oct 15, 2020 12:00 PM EST"

export class DateUtility {
  // Builds a moment object with time for client region based on master time & region. Guesses client region if not provided
  wcToClient = (
    wallclockStr: string,
    masterRegion: string,
    { clientRegion = moment.tz.guess() }: { clientRegion?: string },
  ): moment.Moment => {
    return moment.tz(wallclockStr, masterRegion).tz(clientRegion);
  };
  // Renders client date in human friendly string. Guesses client region if not provided
  wcToClientStr = (
    wallclockStr: string,
    masterRegion: string,
    { clientRegion = moment.tz.guess(), format = DEFAULT_DATE_FORMAT }: { clientRegion?: string; format?: string },
  ): string => {
    return moment
      .tz(wallclockStr, masterRegion)
      .tz(clientRegion)
      .format(format || DEFAULT_DATE_FORMAT);
  };
  // Returns a moment object with wallclock time for master region
  wcToMaster = (wallclockStr: string, masterRegion: string): moment.Moment => {
    return moment.tz(wallclockStr, masterRegion);
  };
  // Renders master date in human friendly string
  wcToMasterStr = (wallclockStr: string, masterRegion: string, format?: string): string => {
    return moment.tz(wallclockStr, masterRegion).format(format || DEFAULT_DATE_FORMAT);
  };
  // Builds a Date with wallclock time for master region (as opposed to user region)
  wcToDate = (wallclockStr: string, masterRegion: string): Date => {
    return moment.tz(wallclockStr, masterRegion).toDate();
  };
  // Takes a wallclock time and region and converts it to UTC.
  // Useful for sorting dates from multiple regions
  wcToUTC = (wallclockStr: string, masterRegion: string): Date => {
    return moment.tz(wallclockStr, masterRegion).utc().toDate();
  };
}
// Copied below from V2 - might use parts later

/* eslint-disable @typescript-eslint/no-explicit-any */
// retuns IANA (ex: "America/Toronto")
// const getLocalTimezone = function () {
//   return Intl.DateTimeFormat().resolvedOptions().timeZone;
// };
//
// interface TimeNumObj {
//   year: number;
//   month: number;
//   date: number;
//   hour: number;
//   min: number;
//   sec?: number;
// }

// IMPORTANT: month is zero index (0-11)
// const buildTimestampStr = function ({ year, month, date, hour, min, sec }: TimeNumObj): string {
//   if (year.toString().length < 4 || year.toString().length > 4) throw "Invalid year";
//   if (month > 11) throw "Invalid month";
//
//   if (min > 59) min = 0;
//   if (hour > 24) hour = 0;
//
//   // prepend a 0 before single digit numbers
//   const prepend = (unit: number): string => {
//     return ("0" + unit).slice(-2);
//   };
//
//   const monthS = prepend(month + 1); // .getMonth() returns [0-11]
//   const dateS = prepend(date);
//   const hourS = hour ? prepend(hour) : "00";
//   const minS = min ? prepend(min) : "00";
//   const secS = sec ? prepend(sec) : "00";
//   return `${year}-${monthS}-${dateS}T${hourS}:${minS}:${secS}`;
// };

// const prettyLocalDate = function (masterDate: string, masterRegion: string, userRegion = getLocalTimezone()): string {
//   const m = moment.tz(masterDate, masterRegion).tz(userRegion);
//   return m.format("dddd, MMM Do YYYY, h:mm z");
// };

// const convertMomentToNewTimezone = function (originDate: string, originRegion: string, targetRegion: string): any {
//   if (!originDate || !originRegion || !targetRegion) throw "Invalid arguments";
//   return moment(originDate, originRegion).tz(targetRegion);
// };

/* eslint-enable @typescript-eslint/no-explicit-any */
