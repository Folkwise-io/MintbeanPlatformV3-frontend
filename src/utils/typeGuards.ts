export const isServerError = (tbd: any) => {
  if (tbd as ServerError) {
    return true;
  }
  return false;
};
