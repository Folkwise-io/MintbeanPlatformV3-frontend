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

const checkTime = (startTime: string, endtTime: string): HackMeetTime => {
  if (moment().diff(startTime) < 0) {
    return { date: startTime, s: "Starts", c: "#02ed9d" };
  } else if (moment().diff(endtTime) < 0) {
    return { date: endtTime, s: "Ends", c: "#009be2" };
  } else {
    return { date: endtTime, s: "Ended", c: "rgba(0,155,226,.5)" };
  }
};

export const MeetCard: FC<MeetProps> = ({ event }) => {
  const { title, description, startTime, endTime, coverImageUrl, region } = event;
  const started = checkTime(startTime, endTime);
  const userTimezone = moment.tz.guess(true);

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
      <img className="w-1/3 flex-grow" src={coverImageUrl} alt={`${name} event banner`}></img>
      <section style={{ minWidth: "18rem" }} className="pl-2 flex-grow w-2/3">
        <h2 className="text-2xl">{title}</h2>
        <p className="my-2">{description}</p>
      </section>
      <section className="my-1 flex w-full justify-between">
        <p>Starts: {moment.tz(startTime, region).tz(userTimezone).format("lll z")}</p>
        <p>Ends: {moment.tz(endTime, region).tz(userTimezone).format("lll z")}</p>
      </section>
      <p className="w-full px-4 bottom-0 absolute">Location: Online</p>
    </button>
  );
};
