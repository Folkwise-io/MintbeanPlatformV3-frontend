// import React, { FC } from "react";
// import { appendOptionalClasses } from "../../../utils/appendOptionalClasses";
// import { formConstants } from "./constants";
// import { InputProps } from "./formTypes";

// /* This checkbox component is for use in fieldsets with multiple checkboxes. For single checkboxes just use the Input component with type="checkbox" */
// interface Props extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
//   options: { label: string; value: string }[];
//   name: string;
//   legend: string;
//   ref: React.RefObject<HTMLInputElement>;
// }

// // must name function in forwardRef argument (non-arrow function) in order to avoid missing diplayName error
// export const FieldsetCheckboxes: FC<Props> = React.forwardRef<InputProps, Props>(function input(
//   { className, name, options, legend, ...rest },
//   passedRef,
// ) {
//   const { itemSpacing, inputStyles } = formConstants;
//   const baseClasses = [itemSpacing, inputStyles].join(" ");
//   const classes = appendOptionalClasses(baseClasses, className);

//   return (
//     <fieldset {...rest}>
//       <legend>{legend}</legend>
//       {options.map(({ label, value }, i) => {
//         <label key={i} htmlFor={name}>
//           {" "}
//           <input type="checkbox" name={name} className={classes} value={value} ref={passedRef} />
//           {label}
//         </label>;
//       })}
//     </fieldset>
//   );
// });
