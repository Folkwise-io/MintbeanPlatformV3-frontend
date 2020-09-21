import React, { FC } from "react";

type Props = {
  children?: JSX.Element[] | JSX.Element;
  type?: "gradStripe" | "grad" | "blackStripe" | "gradStripeEvents" | "blackStripeEvents" | "black";
};

export const BgBlock: FC<Props> = ({ children, type = "gradStripe" }) => {
  const common = "rounded-b-mb-lg";
  const outerClasses = {
    gradStripe: "shadow-mb-outline-green bg-white top-mb-1 relative pb-8",
    grad: "",
    blackStripe: "shadow-mb-outline-darkgreen bg-mb-blue-100 top-mb-1 relative pb-8",
    gradStripeEvents: "shadow-mb-outline-darkgreen bg-white top-mb-1 relative pb-8",
    blackStripeEvents: "shadow-mb-outline-darkgreen bg-mb-green-100 top-mb-1 relative pb-8",
    black: "bg-mb-green-100 top-mb-1 relative pb-8",
  };
  const innerClasses = {
    gradStripe:
      "bg-gradient-to-b from-mb-blue-100 to-mb-green-200 flex flex-col justify-center md:items-center md:flex-row px-10 md:px-12 lg:px-24 gap-16 top-mb-1n relative",
    grad: "bg-gradient-to-b from-mb-blue-100 to-mb-green-200",
    blackStripe: "bg-black top-mb-1n relative",
    gradStripeEvents:
      "bg-gradient-to-b from-mb-blue-100 to-mb-green-200 flex flex-col justify-center gap-16 top-mb-1n relative",
    blackStripeEvents: "bg-black top-mb-1n relative",
    black: "bg-black top-mb-1n relative",
  };
  return (
    <div className={`${common} ${outerClasses[type]}`}>
      <div className={`${common} ${innerClasses[type]}`}>{children}</div>
    </div>
  );
};
