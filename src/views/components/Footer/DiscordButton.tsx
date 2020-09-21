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
    <div className="bg-black text-white row-span-2 grid grid-cols-3 place-items-center py-4 rounded-mb-xs shadow-mb-drop-center-sm">
      <DiscordIcon />
      <div className="col-span-2 text-center">
        <p className="pb-2 font-semibold">{text}</p>
        <Button type="primary">Join Now</Button>
      </div>
    </div>
  );
};
