import React, { FC } from "react";

type FocusCard = {
  title: string;
  description: string;
};

type Props = {
  type?: "homeCard" | "eventsTitle";
  card: FocusCard;
};

export const FocusCard: FC<Props> = ({ type = "homeCard", card }) => {
  const { title, description } = card;
  const h2Classes = {
    homeCard: "font-semibold text-xl",
    eventsTitle: "",
  };
  const pClasses = {
    homeCard: "text-sm",
    eventsTitle: "",
  };
  const sectionClasses = {
    homeCard: "",
    eventsTitle: "",
  };
  return (
    <section className="bg-white mx-6 my-10 pt-6 pb-8 text-center font-body rounded-mb-sm leading-loose px-8 md:px-12 max-w-7xl">
      <h2 className={`mx-auto ${h2Classes[type]}`}>{title}</h2>
      <p className={`tracking-wide max-w-5xl mx-auto ${pClasses[type]}`}>{description}</p>
    </section>
  );
};
