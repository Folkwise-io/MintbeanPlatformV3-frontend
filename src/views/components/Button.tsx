import React, { FC } from "react";

type Props = {
  type?: "primary" | "secondary" | "danger";
  onClick?: () => void;
};

export const Button: FC<Props> = (props) => {
  const { type = "primary", children, ...rest } = props;
  const common = "shadow-md py-2 px-6 rounded-lg hover:shadow-sm border-2 border-solid";
  const classes = {
    primary: "text-white bg-mb-mint border-mb-mint",
    secondary: "text-gray-700 bg-white border-mb-mint",
    danger: "text-white bg-red-500 border-red-500",
  };
  /* important: button must be type="button" or it auto-submits parent forms */
  return (
    <button {...rest} className={`${common} ${classes[type]}`} type="button">
      {children}
    </button>
  );
};
