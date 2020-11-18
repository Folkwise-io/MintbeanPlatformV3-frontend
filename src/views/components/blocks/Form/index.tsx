import React, { FC } from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  ref?: React.RefObject<HTMLFormElement>;
}
export const Form: FC<Props> = ({ children, ref, className, ...rest }) => {
  const baseClasses = "flex flex-col";
  const classes = appendOptionalClasses(baseClasses, className);
  return (
    <form {...rest} ref={ref || null} className={classes}>
      {children}
    </form>
  );
};
