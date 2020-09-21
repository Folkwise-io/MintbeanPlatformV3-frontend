import React, { FC } from "react";

type Props = {
  href: string;
  blank?: boolean;
  noRefferer?: boolean;
  noOpener?: boolean;
  className?: string;
};

export const ExternalLink: FC<Props> = (props) => {
  const { href, blank = true, noRefferer = true, noOpener = true, className, children, ...rest } = props;
  const target = blank ? "_blank" : "_self";
  const rel = `${noRefferer ? "noreferrer" : ""} ${noOpener ? "noopener" : ""}`;
  return (
    <a {...rest} href={href} className={`${className}`} rel={rel} target={target}>
      {children}
    </a>
  );
};
