import React, { FC } from "react";
import { appendOptionalClasses } from "../../utils/appendOptionalClasses";

interface Props {
  className?: string;
}
export const H1: FC<Props> = ({ children, className }) => {
  const baseClasses = "text-4xl mb-4";
  const classes = appendOptionalClasses(baseClasses, className);
  return <h1 className={classes}>{children}</h1>;
};
