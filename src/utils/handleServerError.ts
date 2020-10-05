import { isServerErrorArray } from "./typeGuards";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const handleServerError = (e: any) => {
  if (isServerErrorArray(e)) throw e;
  throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
