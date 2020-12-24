import React, { FC } from "react";

interface Props {
  stat: string;
  label: string;
  centered?: boolean;
  statColor?: "white" | "mint" | "current";
  className?: string;
}
export const Stat: FC<Props> = ({ stat, label, centered, statColor = "current", className = "" }) => {
  const colorMap = {
    white: "white",
    mint: "mb-green-200",
    current: "current",
  };
  const divClasses = `flex justify-center ${centered ? "text-center" : ""} ${className}`;
  const statClasses = `text-4xl block leading-10 font-semibold text-${colorMap[statColor]}`;
  const labelClasses = `block ${centered ? "text-center" : ""} `;
  return (
    <div className={divClasses}>
      <div style={{ maxWidth: "200px" }}>
        <span className={statClasses}>{stat}</span>
        <span className={labelClasses}>{label}</span>
      </div>
    </div>
  );
};
