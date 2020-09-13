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
      <p className="font-display text-xs md:text-sm uppercase bg-yellow-300 md:px-5 h-8 md:mb-6 flex md:inline-flex md:rounded-full items-center">
        {started.s} {moment(started.date).fromNow()}
      </p>
    );
  };

  return (
    <button
      className="grid grid-cols-3 h-32 rounded-sm md:grid-cols-4 md:h-64 w-full"
      style={{ background: started.c }}
    >
      <div className="relative h-32 md:h-64 md:pb-0 pb-8">
        <img className="block h-full object-cover w-full" src={image} alt={`${name} event banner`}></img>
        <section className="absolute bottom-0 inset-x-0 h-8 md:mb-6">{formatTimeLeft()}</section>
      </div>
      <section className="col-span-2 md:col-span-3 flex flex-col justify-center items-start md:items-center px-2 text-left md:text-center relative pb-8 md:pb-0 md:px-12">
        <h2 className="font-display text-lg md:text-3xl mt-1 md:mt-2">{name}</h2>
        <p className="font-body text-base hidden md:block">{description}</p>
        <p className="font-body md:font-display md:text-base mt-1 text-xs">
          from {moment.tz(startDate, region).tz(userTimezone).format("lll z")}
        </p>
        <p className="font-body md:font-display md:text-base text-xs">
          to {moment.tz(endDate, region).tz(userTimezone).format("lll z")}
        </p>
        <p className="font-display text-xs md:text-sm uppercase bg-black text-white md:px-10 md:py-2 md:mt-4 md:rounded-full h-8 md:static absolute bottom-0 mt-8 inset-x-0 pl-2 flex items-center">
          Location: Online
        </p>
      </section>
    </button>
  );
};
