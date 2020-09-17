import { DateUtility } from "../../../src/utils/DateUtility";

const d = new DateUtility();

// must test a date in the past as we are sure if it's timezone
const WALLCLOCK_TIME = "2020-09-15T12:00:00.000"; // Sep 30, 12:00PM
const MEET_REGION = "America/Toronto";
const CLIENT_REGION = "America/Los_Angeles"; // <-- usually 3 hr time difference from Toronto

describe("Date Utility", () => {
  describe("wcToMaster", () => {
    it("builds a moment with wallclock time for master region", () => {
      const m = d.wcToMaster(WALLCLOCK_TIME, MEET_REGION);
      expect(m.format("lll z")).toBe("Sep 15, 2020 12:00 PM EDT");
    });
  });
  describe("wcToUTC", () => {
    it("converts a wallclock time for given region to UTC date", () => {
      const m = d.wcToUTC(WALLCLOCK_TIME, MEET_REGION);
      expect(m.toISOString()).toBe("2020-09-15T16:00:00.000Z"); // 4 hours ahead
    });
  });
  describe("wcToClientStr", () => {
    it("renders a human friendly date string the is correctly converted to client time from master time", () => {
      const string = d.wcToClientStr(WALLCLOCK_TIME, MEET_REGION, { clientRegion: CLIENT_REGION });
      expect(string).toBe("Tue, Sep 15, 2020 9:00 AM PDT"); // 3 hours behind
    });
  });
});
