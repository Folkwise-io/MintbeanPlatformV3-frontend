import React, { FC } from "react";

type Props = {
  type?: "primary" | "secondary" | "danger";
  buttonType?: "button" | "submit" | "reset";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  forwardRef?: React.RefCallback<HTMLButtonElement>;
};

export const Button: FC<Props> = (props) => {
  const { type = "primary", forwardRef, className, buttonType = "button", children, ...rest } = props;
  const common =
    "transition duration-500 ease-in-out shadow-md py-2 px-6 rounded-lg hover:shadow-sm hover:opacity-75 focus:shadow-sm focus:opacity-75 border-2 border-solid font-semibold";
  const classes = {
    primary: "text-white bg-mb-green-200 border-mb-green-200",
    secondary: "text-gray-700 bg-white border-mb-green-200",
    danger: "text-white bg-red-500 border-red-500",
  };
  /* important: button must be type="button" or it auto-submits parent forms */
  return (
    <button
      {...rest}
      ref={forwardRef || null}
      className={`${common} ${classes[type]} ${className ? className : ""}`}
      type={buttonType}
    >
      {children}
    </button>
  );
};
