import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { InputProps } from "./formTypes";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isRequired?: boolean;
  label: string;
  name: string;
  srOnly?: boolean;
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const Input = React.forwardRef<InputProps, Props>(function input(
  { className, name, label, isRequired, srOnly = false, ...rest },
  passedRef,
) {
  const { itemSpacing, inputStyles, labelStyles } = formConstants;
  const baseClasses = [itemSpacing, inputStyles].join(" ");
  const inputClasses = appendOptionalClasses(baseClasses, className);

  const theLabel = label + (isRequired ? "*" : "");

  return (
    <>
      <label htmlFor={name} className={labelStyles + ` ${srOnly ? "sr-only" : ""}`}>
        {theLabel}
      </label>
      <input {...rest} name={name} ref={passedRef || null} className={inputClasses} />
    </>
  );
});
