import React, { FC } from "react";

interface Props extends React.AnchorHTMLAttributes<HTMLElement> {
  href: string;
}

export const A: FC<Props> = ({ href, className, children, ...rest }) => {
  const baseClasses = "text-mb-green-200";
  const classes = `${baseClasses} ${className ? className : ""}`;

  return (
    <a {...rest} href={href} className={classes}>
      {children}
    </a>
  );
};
