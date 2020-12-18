import React, { FC } from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";

interface Props {
  errorMessage?: string;
  withBackground?: boolean;
}
export const FormValidationErrorMsg: FC<Props> = ({ errorMessage, withBackground }) => {
  if (!errorMessage) return null;

  const baseClasses = "text-red-500";
  const optionalClasses = withBackground ? "bg-white opacity-75 rounded" : "";
  const classes = appendOptionalClasses(baseClasses, optionalClasses);

  return <p className={classes}>{errorMessage}</p>;
};
