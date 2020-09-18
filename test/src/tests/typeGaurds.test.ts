import { isServerError, isServerErrorArray } from "../../../src/utils/typeGuards";

describe("typeGuards", () => {
  describe("isServerError()", () => {
    it("returns true if input is of ServerError type", async () => {
      const ERROR = { message: "test", extensions: { code: "CODE" } };

      expect(isServerError(ERROR)).toBe(true);
    });
    it("returns false if input is not of ServerError type", async () => {
      expect(isServerError("foo")).toBe(false);
      expect(isServerError(["foo"])).toBe(false);
      expect(isServerError({ message: "test" })).toBe(false);
      expect(isServerError([{ message: "test" }])).toBe(false);
      expect(isServerError([{ message: "test", extensions: { code: "TEST" } }])).toBe(false);
    });
  });
  describe("isServerErrorArray()", () => {
    it("returns true if input is of ServerError[] type", async () => {
      const ERROR = { message: "test", extensions: { code: "CODE" } };

      expect(isServerErrorArray([ERROR, ERROR])).toBe(true);
      expect(isServerErrorArray([ERROR])).toBe(true);
    });
    it("returns false if input is not of ServerError[] type", async () => {
      expect(isServerErrorArray("foo")).toBe(false);
      expect(isServerErrorArray(["foo"])).toBe(false);
      expect(isServerErrorArray({ message: "test" })).toBe(false);
      expect(isServerErrorArray([{ message: "test" }])).toBe(false);
      expect(isServerErrorArray({ message: "test", extensions: { code: "TEST" } })).toBe(false);
    });
  });
});
