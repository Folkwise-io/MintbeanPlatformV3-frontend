import React from "react";
import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
import { formConstants } from "./constants";
import { TextAreaProps } from "./formTypes";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label: string;
  name: string;
}

// must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
export const TextArea = React.forwardRef<TextAreaProps, Props>(function textarea(
  { className, name, label, ...rest },
  passedRef,
) {
  const baseClasses = formConstants.itemSpacing;
  const classes = appendOptionalClasses(baseClasses, className);

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} name={name} ref={passedRef || null} className={classes} />
    </>
  );
});
