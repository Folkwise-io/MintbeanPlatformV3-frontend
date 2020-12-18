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
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const Select = React.forwardRef<SelectProps, Props>(function select(
  { options, className, name, label, isRequired, ...rest },
  passedRef,
) {
  const baseClasses = formConstants.itemSpacing;
  const classes = appendOptionalClasses(baseClasses, className);
  const theLabel = label + (isRequired ? "*" : "");
  return (
    <>
      <label htmlFor={name} className="font-semibold">
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
