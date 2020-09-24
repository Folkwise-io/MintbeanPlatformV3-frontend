import { DateUtility } from "../../../src/utils/DateUtility";

const d = new DateUtility();

describe("Date Utility", () => {
  describe("wcToUTC", () => {
    it("converts a wallclock time for given region to UTC date", () => {
      const m = d.wcToUTC("2020-09-15T12:00:00.000", "America/Toronto");
      expect(m.toISOString()).toBe("2020-09-15T16:00:00.000Z"); // 4 hours ahead
    });
    it("helps chronolgically compare two dates in different regions", () => {
      const SHOULD_BE_LATER = {
        wc: "2020-09-15T12:00:00.000",
        region: "America/Los_Angeles",
      };
      const SHOULD_BE_EARLIER = {
        wc: "2020-09-15T12:00:00.000",
        region: "America/Toronto",
      };
      const earlier = d.wcToUTC(SHOULD_BE_EARLIER.wc, SHOULD_BE_EARLIER.region);
      const later = d.wcToUTC(SHOULD_BE_LATER.wc, SHOULD_BE_LATER.region);
      expect(later > earlier).toBe(true);
      expect(later.toISOString()).toBe("2020-09-15T19:00:00.000Z");
      expect(earlier.toISOString()).toBe("2020-09-15T16:00:00.000Z");
    });
  });
  describe("wcToClientStr", () => {
    it("renders a human friendly date string the is correctly converted to client time from master time", () => {
      const string = d.wcToClientStr("2020-09-15T12:00:00.000", "America/Toronto", {
        clientRegion: "America/Los_Angeles",
      });
      expect(string).toBe("Tue, Sep 15, 2020 9:00 AM PDT"); // 3 hours behind
    });
  });
  describe("getDuration", () => {
    it("calculates the hour duration of various datetime string pairs", () => {
      // same day
      const s1 = "2020-10-15T12:00:00.000";
      const e1 = "2020-10-15T16:00:00.000";
      expect(d.getDurationInHours(s1, e1)).toBe(4);
      // multiday
      const s2 = "2020-10-15T12:00:00.000";
      const e2 = "2020-10-17T12:00:00.000";
      expect(d.getDurationInHours(s2, e2)).toBe(48);
      // order doesn't matter
      const s3 = "2020-10-15T12:00:00.000";
      const e3 = "2020-10-17T12:00:00.000";
      expect(d.getDurationInHours(e3, s3)).toBe(48);
      // fractional hours
      const s4 = "2020-10-15T12:00:00.000";
      const e4 = "2020-10-15T16:30:00.000";
      expect(d.getDurationInHours(e4, s4)).toBe(4.5);
      const s5 = "2020-10-15T12:00:00.000";
      const e5 = "2020-10-15T16:45:00.000";
      expect(d.getDurationInHours(e5, s5)).toBe(4.75);
    });
  });
  describe("isPast", () => {
    it("returns true if date is in past", () => {
      const isPast = d.isPast("2020-09-15T12:00:00.000", "America/Toronto", "America/Toronto");
      expect(isPast).toBe(true);
    });
    it("returns false if date is in future", () => {
      const isPast = d.isPast("2060-09-15T12:00:00.000", "America/Toronto", "America/Toronto");
      expect(isPast).toBe(false);
    });
  });
  describe("isChronologicalNoTz", () => {
    it("returns true if date args are chronolgical", () => {
      expect(d.isChronologicalNoTz("2020-09-15T12:00:00.000", "2020-09-15T13:00:00.000")).toBe(true);
      expect(d.isChronologicalNoTz("2020-09-15T12:00:00.000", "2020-09-15T23:00:00.001")).toBe(true);
      expect(d.isChronologicalNoTz("2020-09-15T12:00:00.000", "2020-09-16T12:00:00.000")).toBe(true);
      expect(d.isChronologicalNoTz("2020-09-15T12:00:00.000", "2021-09-15T12:00:00.000")).toBe(true);
      expect(d.isChronologicalNoTz("2020-09-15T12:00", "2021-09-15T13:00")).toBe(true);
    });
    it("returns false if date args are chronolgical", () => {
      expect(d.isChronologicalNoTz("2020-09-15T12:00:00.000", "2020-09-15T12:00:00.000")).toBe(false);
      expect(d.isChronologicalNoTz("2021-09-15T12:00:00.000", "2020-09-15T12:00:00.000")).toBe(false);
      expect(d.isChronologicalNoTz("2020-09-16T12:00:00.000", "2020-09-16T12:00:00.000")).toBe(false);
      expect(d.isChronologicalNoTz("2020-09-15T12:00:00.001", "2020-09-15T12:00:00.000")).toBe(false);
      expect(d.isChronologicalNoTz("2020-10-15T15:00", "2020-09-15T14:00")).toBe(false);
    });
  });
  describe("validateTimestampsNoTz()", () => {
    it("returns true if all strings match non timestamp datestring pattern", () => {
      expect(d.validateTimestamps(["2020-09-15T12:00:00.000", "2020-09-15T13:00:00.000"])).toBe(true);
      expect(d.validateTimestamps(["2020-09-15T12:00:00.000"])).toBe(true);
      expect(d.validateTimestamps("2020-09-15T12:00:00.000")).toBe(true);
    });
    it("returns false if any of strings do not match non timestamp datestring pattern", () => {
      expect(d.validateTimestamps(["2020-09-15T12:00:00.000Z", "2020-09-15T13:00:00.000"])).toBe(false);
      expect(d.validateTimestamps(["xxx"])).toBe(false);
      expect(d.validateTimestamps("xxx")).toBe(false);
      expect(d.validateTimestamps([])).toBe(false);
    });
  });
});
