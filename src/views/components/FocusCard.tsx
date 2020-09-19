import React, { FC } from "react";

type FocusCard = {
  title: string;
  description: string;
};

type Props = {
  card: FocusCard;
};

export const FocusCard: FC<Props> = ({ card }) => {
  const { title, description } = card;
  return (
    <section className="bg-white mx-6 my-10 pt-6 pb-8 text-center font-body rounded-mb-sm leading-loose px-8 md:px-12 max-w-7xl">
      <h2 className="font-semibold text-xl mx-auto">{title}</h2>
      <p className="text-sm tracking-wide max-w-5xl mx-auto">{description}</p>
    </section>
  );
};
