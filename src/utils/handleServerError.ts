import { isServerErrorArray } from "./typeGuards";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
export const handleServerError = (e: any) => {
  if (isServerErrorArray(e)) throw e;
  throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
};
