// Returns true if Apollo Server error with given code found in errors Array
/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types  */
export const hasErrorWithCode = (errors: any, errCode: string): boolean => {
  if (!Array.isArray(errors)) return false;
  const matchedErrors: boolean[] = [];
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  errors.forEach((err: any) => {
    if (err.extensions && err.extensions.code && err.extensions.code === errCode) {
      matchedErrors.push(true);
    }
  });

  return matchedErrors.length > 0 ? true : false;
};
