/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isServerError = (tbd: any) => {
  if (tbd as ServerError) {
    return true;
  }
  return false;
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
