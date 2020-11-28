export const appendOptionalClasses = (baseClasses: string, appendedClasses: string | undefined): string => {
  if (!appendedClasses) return baseClasses;
  return `${baseClasses} ${appendedClasses}`;
};
