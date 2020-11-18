import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";

export const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(function form(
  { children, className, ...rest },
  ref,
) {
  const baseClasses = "flex flex-col";
  const classes = appendOptionalClasses(baseClasses, className);
  return (
    <form {...rest} ref={ref || null} className={classes}>
      {children}
    </form>
  );
});
