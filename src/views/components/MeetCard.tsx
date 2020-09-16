import React, { FC } from "react";
import moment from "moment-timezone";
import { Button } from "./Button";

type MeetProps = {
  event: HackMeet;
};

export const MeetCard: FC<MeetProps> = ({ event }) => {
  const { title, description, startTime, endTime, coverImageUrl, region } = event;
  const userTimezone = moment.tz.guess(true);

  return (
    <div className="shadow-md bg-white flex flex-col md:flex-row max-w-screen-md items-center rounded-lg overflow-hidden">
      <div className="max-w-full md:w-1/3 md:max-h-full">
        <img className="w-full h-full object-cover" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>
      <div className="w-2/3 p-4">
        <section className="my-1 w-full">
          <h2 className="text-2xl mb-2">{title}</h2>
          <p>{description}</p>

          <p>Starts: {moment.tz(startTime, region).tz(userTimezone).format("lll z")}</p>
          <p>Ends: {moment.tz(endTime, region).tz(userTimezone).format("lll z")}</p>
        </section>
        <Button>More</Button>
      </div>
    </div>
  );
};
