import React, { FC } from "react";
import discordImg from "../../../assets/home/discord-logo.png";

type Props = {
  type?: "small" | "large";
};

export const DiscordIcon: FC<Props> = (props) => {
  const { type = "small" } = props;
  const common = "rounded-full border-mb-green-200";
  const classes = {
    small: "col-span-1 w-16 h-16 place-self-end border-4 shadow-mb-outline",
    large: "w-1/2 h-1/2 border-10 shadow-mb-outline-lg",
  };
  const imgClasses = {
    small: "p-2",
    large: "p-6",
  };
  return (
    <div className={`${common} ${classes[type]}`}>
      <img className={`${imgClasses[type]}`} src={discordImg} alt="Discord logo" />
    </div>
  );
};