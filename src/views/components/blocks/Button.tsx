import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "primary" | "primaryAdmin" | "secondary" | "danger" | "minty" | "override"; // buttonStyle: "override" allows overriding the common class styles for custom ones via className
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
  const common =
    "mb-transition shadow-sm py-1 px-5 rounded-lg border-2 border-solid hover:shadow-md focus:shadow-md hover:opacity-75 focus:opacity-75";
  const classes = {
    primary: "text-black bg-mb-green-500 border-mb-green-500 font-semibold",
    primaryAdmin: "text-white bg-mb-orange-100 border-mb-orange-100",
    secondary: "text-mb-green-200 border-mb-green-200 ",
    danger: "text-white bg-red-500 border-red-500",
    minty: "text-black mb-gradient-to-blue-b border-transparent",
    override: "",
  };
  const disabledStyles = "text-black bg-gray-500 border-gray-700 cursor-not-allowed";

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
