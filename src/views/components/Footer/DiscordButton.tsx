import React, { FC } from "react";
import { Button } from "../blocks/Button";
import { ExternalLink } from "../ExternalLink";
import DiscordIcon from "./DiscordIcon";

type DiscordButton = {
  text: string;
};

type Props = {
  button: DiscordButton;
};

const DiscordButton: FC<Props> = ({ button }) => {
  const { text } = button;
  return (
    <div className="bg-black text-white row-span-2 px-2 py-3 rounded-lg shadow-mb-drop-center-sm w-68 flex items-center justify-center">
      <div className="w-1/4 mb-flex-centered">
        <DiscordIcon />
      </div>
      <div className="text-center w-3/4">
        <p className="pb-2  text-xs tracking-tight">{text}</p>
        <ExternalLink href={"https://discord.gg/j7CjBAz"}>
          <Button className="text-xs font-medium py-0">Join Now</Button>
        </ExternalLink>
      </div>
    </div>
  );
};

export default DiscordButton;
