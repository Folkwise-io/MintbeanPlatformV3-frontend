import React, { FC } from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";

export const Form: FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, className, ...rest }) => {
  const baseClasses = "flex flex-col";
  const classes = appendOptionalClasses(baseClasses, className);
  return (
    <form {...rest} className={classes}>
      {children}
    </form>
  );
};
