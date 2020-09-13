import React, { FC } from "react";
import moment from "moment-timezone";
type HackMeetTime = {
  date: string;
  s: string;
  c: string;
};

type MeetProps = {
  event: HackMeet;
};

const checkTime = (startDate: string, endDate: string): HackMeetTime => {
  if (moment().diff(startDate) < 0) {
    return { date: startDate, s: "Starts", c: "#02ed9d" };
  } else if (moment().diff(endDate) < 0) {
    return { date: endDate, s: "Ends", c: "#009be2" };
  } else {
    return { date: endDate, s: "Ended", c: "rgba(0,155,226,.5)" };
  }
};

export const MeetCard: FC<MeetProps> = ({ event }) => {
  const { name, description, startDate, endDate, image, region } = event;
  const started = checkTime(startDate, endDate);
  const userTimezone = moment.tz.guess(true);

  const formatTimeLeft = () => {
    return (
      <p className="font-display text-sm uppercase bg-yellow-300 px-5 py-2 mb-6 inline-block rounded-full">
        {started.s} {moment(started.date).fromNow()}
      </p>
    );
  };

  return (
    <button className="grid grid-cols-1 md:grid-cols-4 rounded-sm" style={{ background: started.c }}>
      <div className="relative">
        <section className="absolute bottom-0 inset-x-0">{formatTimeLeft()}</section>
        <img className="block" src={image} alt={`${name} event banner`}></img>
      </div>
      <section className="col-span-3 flex flex-col justify-center items-center">
        <h2 className="font-display text-3xl mt-2">{name}</h2>
        <p className="font-body text-base">{description}</p>
        <p className="font-display text-base mt-1">
          Starts: {moment.tz(startDate, region).tz(userTimezone).format("lll z")}
        </p>
        <p className="font-display text-base">Ends: {moment.tz(endDate, region).tz(userTimezone).format("lll z")}</p>
        <p className="font-display text-sm uppercase bg-black text-white px-10 py-2 mt-4 rounded-full">
          Location: Online
        </p>
      </section>
    </button>
  );
};
