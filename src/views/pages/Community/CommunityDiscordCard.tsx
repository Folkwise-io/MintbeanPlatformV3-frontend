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
    <article className="col-span-2 bg-black text-white inline-flex flex-col justify-evenly items-center py-10 mx-auto md:mx-0 max-w-sm md:mt-20 md:min-w-12rem rounded-mb-sm mb-20">
      <DiscordIcon type="large" />
      <h2 className=" text-xl font-semibold pt-8 pb-10">{message}</h2>
      <Button type="primary">Join Now</Button>
    </article>
  );
};
