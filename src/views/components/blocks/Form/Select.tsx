import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { SelectProps } from "./formTypes";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  name: string;
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const Select = React.forwardRef<SelectProps, Props>(function select(
  { children, className, name, label, ...rest },
  passedRef,
) {
  const baseClasses = formConstants.itemSpacing;
  const classes = appendOptionalClasses(baseClasses, className);

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select {...rest} ref={passedRef} className={classes}>
        {children}
      </select>
    </>
  );
});
