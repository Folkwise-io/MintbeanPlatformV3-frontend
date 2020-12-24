import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { SelectProps, Option } from "./formTypes";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  isRequired?: boolean;
  label: string;
  name: string;
  options: Option[];
  srOnly?: boolean;
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const Select = React.forwardRef<SelectProps, Props>(function select(
  { options, className, isRequired, name, label, srOnly = false, ...rest },
  passedRef,
) {
  const { itemSpacing, labelStyles } = formConstants;
  const baseClasses = itemSpacing;
  const classes = appendOptionalClasses(baseClasses, className);
  const theLabel = label + (isRequired ? "*" : "");

  return (
    <>
      <label htmlFor={name} className={labelStyles + ` ${srOnly ? "sr-only" : ""}`}>
        {theLabel}
      </label>
      <select {...rest} name={name} ref={passedRef || null} className={classes}>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
});
