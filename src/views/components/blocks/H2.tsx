import React, { FC } from "react";
import { appendOptionalClasses } from "../../utils/appendOptionalClasses";

interface Props {
  className?: string;
}
export const H2: FC<Props> = ({ children, className }) => {
  const baseClasses = "text-3xl mb-4";
  const classes = appendOptionalClasses(baseClasses, className);
  return <h2 className={classes}>{children}</h2>;
};
