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
      <p>
        {started.s} {moment(started.date).fromNow()}
      </p>
    );
  };

  return (
    <button className="relative flex w-auto flex-col" style={{ background: started.c }}>
      <section className="absolute">{formatTimeLeft()}</section>
      <img className="block" src={image} alt={`${name} event banner`}></img>
      <section /*className=""*/>
        <h2 /*className=""*/>{name}</h2>
        <p /*className=""*/>{description}</p>
        <p>Starts: {moment.tz(startDate, region).tz(userTimezone).format("lll z")}</p>
        <p>Ends: {moment.tz(endDate, region).tz(userTimezone).format("lll z")}</p>
        <p /*className=""*/>Location: Online</p>
      </section>
    </button>
  );
};
