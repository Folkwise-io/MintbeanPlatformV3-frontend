import React, { FC } from "react";
import { DiscordIcon } from "../../components/Footer/DiscordIcon";
import { ExternalLink } from "../../components/ExternalLink";
import { Button } from "../../components/blocks/Button";

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
      <ExternalLink href="https://discord.com/invite/j7CjBAz">
        <Button buttonStyle="primary">Join Now</Button>
      </ExternalLink>
    </article>
  );
};
