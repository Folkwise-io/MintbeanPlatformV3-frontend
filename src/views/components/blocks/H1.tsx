import React, { FC } from "react";

interface Props {
  className?: string;
}
export const H1: FC<Props> = ({ children, className }) => {
  const baseClasses = "text-2xl";
  const classes = `${baseClasses} ${className ? className : ""}`;
  return <h1 className={classes}>{children}</h1>;
};
