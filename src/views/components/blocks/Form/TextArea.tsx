import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { TextAreaProps } from "./formTypes";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label: string;
  name: string;
  srOnly?: boolean;
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const TextArea = React.forwardRef<TextAreaProps, Props>(function textarea(
  { className, name, label, srOnly = false, ...rest },
  passedRef,
) {
  const { itemSpacing, inputStyles } = formConstants;
  const baseClasses = [itemSpacing, inputStyles].join(" ");
  const classes = appendOptionalClasses(baseClasses, className);

  let labelClasses = "";

  if (srOnly) {
    labelClasses = "sr-only";
  }

  return (
    <>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <textarea {...rest} name={name} ref={passedRef || null} className={classes} />
    </>
  );
});
