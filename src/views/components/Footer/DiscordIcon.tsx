import React, { FC } from "react";
import discordImg from "../../../assets/home/discord.svg";

export const DiscordIcon: FC<unknown> = () => {
  return (
    <div className="col-span-1 rounded-full border-mb-green-200 border-4 shadow-mb-outline w-16 h-16 place-self-end">
      <img className="p-2" src={discordImg} alt="Discord logo" />
    </div>
  );
};
