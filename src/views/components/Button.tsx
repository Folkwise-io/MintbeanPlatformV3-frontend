import React, { FC } from "react";

interface Props {
  type?: "primary" | "primaryAdmin" | "secondary" | "danger";
  buttonType?: "button" | "submit" | "reset";
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
  forwardRef?: React.RefCallback<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: FC<Props> = (props) => {
  const { type = "primary", forwardRef, className, buttonType = "button", disabled = false, children, ...rest } = props;
  const common = "shadow-md py-2 px-6 rounded-lg border-2 border-solid font-semibold";
  const classes = {
    primary:
      "mb-transition text-black bg-mb-green-100 border-mb-green-200 hover:shadow-sm hover:opacity-75 hover:text-mb-purple-100 focus:shadow-sm focus:opacity-75",
    primaryAdmin: "text-white bg-yellow-500 border-yellow-500",
    secondary:
      "mb-transition text-gray-700 bg-white border-mb-green-200 hover:shadow-sm hover:opacity-75 focus:shadow-sm focus:opacity-75",
    danger:
      "mb-transition text-white bg-red-500 border-red-500 hover:shadow-sm hover:opacity-75 focus:shadow-sm focus:opacity-75",
  };
  const disabledStyles = "text-white bg-gray-500 border-gray-700 cursor-not-allowed";
  const computedStyles = `${common} ${disabled ? disabledStyles : classes[type]} ${className && className}`;
  /* important: button must be type="button" or it auto-submits parent forms */
  return (
    <button disabled={disabled} {...rest} ref={forwardRef || null} className={computedStyles} type={buttonType}>
      {children}
    </button>
  );
};
