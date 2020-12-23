import React, { FC } from "react";
import discordImg from "../../../assets/home/discord-logo.png";

type Props = {
  type?: "small" | "large";
};

export const DiscordIcon: FC<Props> = (props) => {
  const { type = "small" } = props;
  const common = "rounded-full border-mb-green-200";
  const classes = {
    small: "col-span-1 w-12 h-12 place-self-end md:place-self-center border-3 shadow-mb-outline",
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
