import React, { FC } from "react";
import moment from "moment-timezone";
import { Button } from "./Button";
import { DateUtility } from "../../utils/DateUtility";

const d = new DateUtility();

type MeetProps = {
  meet: HackMeet;
};

export const MeetCard: FC<MeetProps> = ({ meet }) => {
  const { title, description, startTime, endTime, coverImageUrl, region } = meet;

  const startTimeStr = d.wcToClientStr(startTime, region, { clientRegion: undefined });
  const duration = d.getDuration(startTime, endTime);
  return (
    <div className="shadow-md bg-white flex flex-col md:flex-row max-w-screen-md items-center rounded-lg overflow-hidden">
      <div className="max-w-full md:w-1/3 md:max-h-full">
        <img className="w-full h-full object-cover" src={coverImageUrl} alt={`${title} event banner`}></img>
      </div>
      <div className="w-2/3 p-4">
        <section className="my-1 w-full">
          <h2 className="text-2xl mb-2">{title}</h2>
          <p className="mb-2">{description}</p>
          <p className="mb-2">
            {startTimeStr} <span>({duration} hours)</span>
          </p>
        </section>
        <Button>More</Button>
      </div>
    </div>
  );
};
