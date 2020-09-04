import React, { FC } from "react";
import moment from "moment";
type Props = {
  event: HackEvent;
};

export const EventCard: FC<Props> = ({ event }) => {
  const { name, description, startDate, endDate, image } = event;
  return (
    <article>
      <h3>{name}</h3>
      <img src={image} alt={`${name} event banner`}></img>
      <p>{description}</p>
      <section>
        <p>{moment(startDate).locale(true).format("LLL")}</p>
        <p>{moment(endDate).locale(true).format("LLL")}</p>
      </section>
    </article>
  );
};
