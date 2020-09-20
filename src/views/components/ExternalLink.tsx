import React, { FC } from "react";

type Props = {
  blank?: boolean;
  noRefferer?: boolean;
  noOpener?: boolean;
  className?: string;
};

export const ExternalLink: FC<Props> = (props) => {
  const { blank = true, noRefferer = true, noOpener = true, className, children, ...rest } = props;
  const target = blank ? "_blank" : "_self";
  const rel = `${noRefferer ? "noreferrer" : ""} ${noOpener ? "noopener" : ""}`;
  return (
    <a {...rest} className={`${className}`} rel={rel} target={target}>
      {children}
    </a>
  );
};
