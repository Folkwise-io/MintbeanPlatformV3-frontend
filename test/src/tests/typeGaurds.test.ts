import { isServerError } from "../../../src/utils/typeGuards";

describe("typeGuards", () => {
  describe("isServorError()", () => {
    it("returns true if input is of ServerError type", async () => {
      const ERROR = { message: "test", extensions: { code: "CODE" } };

      const isServerErr = isServerError(ERROR);
      expect(isServerErr).toBe(true);
    });
    it("returns false if input is not of ServerError type", async () => {
      const ERROR = { message: "test", extensions: { code: "CODE" } };

      const isServerErr = isServerError(ERROR);
      expect(isServerErr).toBe(true);
    });
  });
});
