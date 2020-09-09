import React, { FC } from "react";
import moment from "moment";
type HackMeetTime = {
  date: Date;
  s: string;
  c: string;
};

type Props = {
  event: HackMeet;
};

const checkTime = (startDate: Date, endDate: Date): HackMeetTime => {
  if (moment().diff(startDate) < 0) {
    return { date: startDate, s: "Starts", c: "#02ed9d" };
  } else if (moment().diff(endDate) < 0) {
    return { date: endDate, s: "Ends", c: "#009be2" };
  } else {
    return { date: endDate, s: "Ended", c: "rgba(0,155,226,.5)" };
  }
};

export const MeetCard: FC<Props> = ({ event }) => {
  const { name, description, startDate, endDate, image } = event;
  const started = checkTime(startDate, endDate);

  const formatTimeLeft = () => {
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
      <section className="w-full px-4 top-0 absolute">{formatTimeLeft()}</section>
      <img className="w-1/3 flex-grow" src={image} alt={`${name} event banner`}></img>
      <section className="pl-2 flex-grow min-w-l w-2/3">
        <h2 className="text-2xl">{name}</h2>
        <p className="my-2">{description}</p>
      </section>
      <section className="my-1 flex w-full justify-between">
        <p>Starts: {moment(startDate).format("lll")}</p>
        <p>Ends: {moment(endDate).format("lll")}</p>
      </section>
      <p className="w-full px-4 bottom-0 absolute">Location: Online</p>
    </button>
  );
};
