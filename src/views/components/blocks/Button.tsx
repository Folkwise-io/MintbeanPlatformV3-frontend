import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "primary" | "primaryAdmin" | "secondary" | "danger" | "override"; // buttonStyle: "override" allows overriding the common class styles for custom ones via className
  type?: "button" | "submit" | "reset";
  forwardRef?: React.RefCallback<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: FC<Props> = (props) => {
  const {
    buttonStyle = "primary",
    forwardRef,
    className,
    type = "button",
    disabled = false,
    children,
    ...rest
  } = props;
  const common = "shadow-md py-2 px-6 rounded-lg border-2 border-solid font-semibold";
  const classes = {
    primary:
      "mb-transition text-black bg-mb-green-100 border-mb-green-200 hover:shadow-sm hover:opacity-75 hover:text-mb-purple-100 focus:shadow-sm focus:opacity-75",
    primaryAdmin: "text-white bg-yellow-500 border-yellow-500",
    secondary:
      "mb-transition text-gray-700 bg-white border-mb-green-200 hover:shadow-sm hover:opacity-75 focus:shadow-sm focus:opacity-75",
    danger:
      "mb-transition text-white bg-red-500 border-red-500 hover:shadow-sm hover:opacity-75 focus:shadow-sm focus:opacity-75",
    override: "mb-transition",
  };
  const disabledStyles = "text-white bg-gray-500 border-gray-700 cursor-not-allowed";

  let computedStyles = "";

  if (buttonStyle !== "override") {
    computedStyles += common;
  }

  if (disabled) {
    computedStyles += ` ${disabledStyles}`;
  } else {
    computedStyles += ` ${classes[buttonStyle]}`;
  }

  if (className) {
    computedStyles += ` ${className}`;
  }

  /* important: button must be type="button" if not a submit button or else it auto-submits parent forms */
  return (
    <button disabled={disabled} {...rest} ref={forwardRef || null} className={computedStyles} type={type}>
      {children}
    </button>
  );
};
