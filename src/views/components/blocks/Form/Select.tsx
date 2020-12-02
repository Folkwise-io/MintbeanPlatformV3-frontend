import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { SelectProps, Option } from "./formTypes";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label: string;
  name: string;
  options: Option[];
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const Select = React.forwardRef<SelectProps, Props>(function select(
  { options, className, name, label, ...rest },
  passedRef,
) {
  const baseClasses = formConstants.itemSpacing;
  const classes = appendOptionalClasses(baseClasses, className);

  return (
    <>
      <label htmlFor={name}>{label}</label>
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
