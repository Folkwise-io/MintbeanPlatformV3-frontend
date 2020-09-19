import React, { FC } from "react";

type Props = {
  type?: "primary" | "secondary" | "danger";
  onClick?: () => void;
};

export const Button: FC<Props> = (props) => {
  const { type = "primary", children, ...rest } = props;
  const common = "shadow-md py-2 px-6 rounded-lg hover:shadow-sm border-2 border-solid";
  const classes = {
    primary: "text-white bg-mb-green-200 border-mb-green-200",
    secondary: "text-gray-700 bg-white border-mb-green-200",
    danger: "text-white bg-red-500 border-red-500",
  };
  return (
    <button {...rest} className={`${common} ${classes[type]}`}>
      {children}
    </button>
  );
};
