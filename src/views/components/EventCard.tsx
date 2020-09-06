import React, { FC } from "react";
import moment from "moment";
type EventTime = {
  date: Date;
  s: string;
  c: string;
};

type Props = {
  event: HackEvent;
};

const checkTime = (startDate: Date, endDate: Date): EventTime => {
  if (moment().diff(startDate) < 0) {
    return { date: startDate, s: "Starts", c: "#02ed9d" };
  } else if (moment().diff(endDate) < 0) {
    return { date: endDate, s: "Ends", c: "#009be2" };
  } else {
    return { date: endDate, s: "Ended", c: "rgba(0,155,226,.5)" };
  }
};

export const EventCard: FC<Props> = ({ event }) => {
  const { name, description, startDate, endDate, image, difficulty, groupSize } = event;
  const started = checkTime(startDate, endDate);

  const formatTime = () => {
    return (
      <p>
        {started.s} {moment(started.date).fromNow()}
      </p>
    );
  };

  return (
    <button
      className="flex flex-wrap relative max-w-xl px-4 py-6 items-center rounded-lg overflow-hidden"
      style={{ background: started.c }}
    >
      <section className="w-full px-4 top-0 absolute">{formatTime()}</section>
      <img className="w-1/3 flex-grow" src={image} alt={`${name} event banner`}></img>
      <section className="pl-2 flex-grow min-w-xl w-2/3">
        <h2 className="text-2xl">{name}</h2>
        <p className="my-2">{description}</p>
        <section className="flex justify-between">
          <p>Team Size: {groupSize}</p>
          <p>Difficulty: {difficulty}</p>
        </section>
      </section>
      <p className="w-full px-4 bottom-0 absolute">Location: Online</p>
    </button>
  );
};
