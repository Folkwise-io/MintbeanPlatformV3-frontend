import React, { FC } from "react";

type Props = {
  title: string;
  subtitle?: string;
};

export const Banner: FC<Props> = ({ title, subtitle }) => {
  return (
    <header className="w-full">
      <div
        className="text-white pt-4 pb-10 shadow-mb"
        style={{ background: "linear-gradient(180deg, black, rgb(61, 61, 61))" }}
      >
        <div>
          <div>{title}</div>
          <div>{subtitle}</div>
        </div>
      </div>
    </header>
  );
};
