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
    <div className="bg-black text-white row-span-2 grid grid-cols-4 place-items-center px-2 py-1 rounded-mb-xs shadow-mb-drop-center-sm">
      <DiscordIcon />
      <div className="col-span-3 text-center">
        <p className="pb-2 font-medium text-xs">{text}</p>
        <ExternalLink href={"https://discord.gg/j7CjBAz"}>
          <Button>Join Now</Button>
        </ExternalLink>
      </div>
    </div>
  );
};
