import { hasErrorWithCode } from "../../../src/utils/hasErrorWithCode";

describe("Utils", () => {
  describe("hasErrorWithCode()", () => {
    it("returns true if ServerError[] array contains error with given error code string", async () => {
      const ERROR_CODE = "ERROR_CODE";
      const errors = [
        { message: "test", extensions: { code: "DUMMY_ERROR" } },
        { message: "test", extensions: { code: ERROR_CODE } },
      ];
      const hasGivenError = hasErrorWithCode(errors, ERROR_CODE);
      expect(hasGivenError).toBe(true);
    });
    it("returns false if ServerError[] array does not contain error with given error code string", async () => {
      const errors = [
        { message: "test", extensions: { code: "DUMMY_ERROR" } },
        { message: "test", extensions: { code: "DUMMY_ERROR2" } },
      ];
      const hasGivenError = hasErrorWithCode(errors, "DUMMIER_ERROR");
      expect(hasGivenError).toBe(false);
    });
  });
});
