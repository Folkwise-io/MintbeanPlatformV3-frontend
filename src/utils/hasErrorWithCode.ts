/* eslint-disable  @typescript-eslint/no-explicit-any */
// Returns true if Apollo Server error with given code found in errors Array
export const hasErrorWithCode = (errors: any, errCode: string): boolean => {
  if (!Array.isArray(errors)) return false;
  const matchedErrors: boolean[] = [];

  errors.forEach((err: any) => {
    // iterate through errors array
    if (err.errors && Array.isArray(err.errors)) {
      err.errors.forEach((z: any) => {
        if (z.extensions && z.extensions.code && z.extensions.code === errCode) {
          matchedErrors.push(true);
        }
      });
    }
  });

  return matchedErrors.length > 0 ? true : false;
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
