import React, { FC } from "react";
import { Button } from "../Button";
import { DiscordIcon } from "./DiscordIcon";

type DiscordButton = {
  text: string;
};

type Props = {
  button: DiscordButton;
};

export const DiscordButton: FC<Props> = ({ button }) => {
  const { text } = button;
  return (
    <div className="bg-black text-white row-span-2 grid grid-cols-3 place-items-center px-2 py-4 rounded-mb-xs shadow-mb-drop-center-sm gap-2">
      <DiscordIcon />
      <div className="col-span-2 text-center">
        <p className="pb-2 font-semibold">{text}</p>
        <a
          className="transition duration-500 ease-in-out shadow-md py-2 px-6 rounded-lg hover:shadow-sm hover:opacity-75 focus:shadow-sm focus:opacity-75 border-2 border-solid font-semibold text-white bg-mb-green-200 border-mb-green-200 inline-block"
          href="https://discord.gg/j7CjBAz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};
