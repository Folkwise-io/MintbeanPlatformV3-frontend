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
  const titleClasses = {
    homeCard: "text-xl",
    eventsTitle: "text-4xl",
  };
  const pClasses = {
    homeCard: "text-sm",
    eventsTitle: "text-lg text-white",
  };
  const sectionClasses = {
    homeCard: "mx-6 rounded-mb-sm bg-white",
    eventsTitle: "mx-24 rounded-mb-md w-3/4",
  };
  return (
    <section
      className={`md:my-8 pt-6 pb-8 text-center font-body leading-loose px-8 md:px-12 max-w-7xl ${sectionClasses[type]}`}
    >
      {type == "eventsTitle" ? (
        <h1 className={`mx-auto font-semibold text-white ${titleClasses[type]}`}>{title}</h1>
      ) : (
        <h2 className={`mx-auto font-semibold ${titleClasses[type]}`}>{title}</h2>
      )}
      <p className={`tracking-wide max-w-5xl mx-auto ${pClasses[type]}`}>{description}</p>
    </section>
  );
};
