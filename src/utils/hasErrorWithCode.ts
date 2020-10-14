/* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
// Returns true if Apollo Server error with given code found in errors Array
export const hasErrorWithCode = (errors: any, errCode: string): boolean => {
  if (!Array.isArray(errors)) return false;
  const matchedErrors: boolean[] = [];
  errors.forEach((err: any) => {
    if (err.extensions && err.extensions.code && err.extensions.code === errCode) {
      matchedErrors.push(true);
    }
  });

  return matchedErrors.length > 0 ? true : false;
};
/* eslint-enable  @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
