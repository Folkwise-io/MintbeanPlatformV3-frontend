import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { InputProps } from "./formTypes";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  name: string;
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const Input = React.forwardRef<InputProps, Props>(function input(
  { className, name, label, ...rest },
  passedRef,
) {
  const { itemSpacing, inputStyles } = formConstants;
  const baseClasses = [itemSpacing, inputStyles].join(" ");
  const classes = appendOptionalClasses(baseClasses, className);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} ref={passedRef || null} className={classes} />
    </>
  );
});
