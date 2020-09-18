import React, { FC } from "react";
import { Button } from "../../components";
import { DiscordIcon } from "../../components/Footer/DiscordIcon";

type Discord = {
  message: string;
};

type Props = {
  discord: Discord;
};

export const DiscordCard: FC<Props> = ({ discord }) => {
  const { message } = discord;
  return (
    <article className="col-span-2 inline-block bg-black">
      <DiscordIcon />
      <h2>{message}</h2>
      <Button type="primary"></Button>
    </article>
  );
};
