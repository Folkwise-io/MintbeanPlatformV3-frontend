import React, { FC } from "react";
import { appendOptionalClasses } from "../../utils/appendOptionalClasses";

interface Props {
  className?: string;
}
const baseClasses = "container max-x-screen-lg mx-auto px-2 xs:px-4 sm:px-6 md:px-20";

export const Container: FC<Props> = ({ children, className }) => {
  const classes = appendOptionalClasses(baseClasses, className);
  return <div className={classes}>{children}</div>;
};
