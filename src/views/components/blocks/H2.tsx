import React, { FC } from "react";

interface Props {
  className?: string;
}
export const H2: FC<Props> = ({ children, className }) => {
  const baseClasses = "text-xl";
  const classes = `${baseClasses} ${className ? className : ""}`;
  return <h2 className={classes}>{children}</h2>;
};
