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
    <article className="col-span-2 bg-black text-white inline-flex flex-col justify-evenly items-center ml-12 rounded-mb-sm my-6">
      <DiscordIcon type="large" />
      <h2 className=" text-xl font-semibold">{message}</h2>
      <Button type="primary">Join Now</Button>
    </article>
  );
};
