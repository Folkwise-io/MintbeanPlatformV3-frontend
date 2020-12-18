import React, { FC } from "react";
import { Button } from "../blocks/Button";
import { ExternalLink } from "../ExternalLink";
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
    <div className="bg-black text-white row-span-2 px-2 py-1 rounded-mb-xs shadow-mb-drop-center-sm w-72 flex items-center">
      <div className="w-1/4">
        <DiscordIcon />
      </div>
      <div className="text-center w-3/4">
        <p className="pb-2 font-medium text-xs">{text}</p>
        <ExternalLink href={"https://discord.gg/j7CjBAz"}>
          <Button className="text-xs font-medium py-0">Join Now</Button>
        </ExternalLink>
      </div>
    </div>
  );
};
