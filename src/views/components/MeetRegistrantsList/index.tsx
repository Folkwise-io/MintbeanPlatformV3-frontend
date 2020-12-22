import React, { FC, useState } from "react";
import "./meetRegistrantsList.css";
import { MeetListUser } from "./MeetListUser";

interface Props {
  meetRegistrants: RegistrantsForMeet[];
}

export const MeetRegistrantsList: FC<Props> = ({ meetRegistrants }) => {
  const [visible, setVisible] = useState<boolean>(true);

  let containerView;

  const switchVisibility = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  if (visible) {
    containerView = (
      <div className="bg-mb-green-200 min-w-lg min-h-screen flex justify-center items-center">
        <div className="bg-black min-w-lg rounded-md max-h-32 p-4">
          <div className="flex justify-between">
            <p className="text-white">{meetRegistrants.length} Attendees</p>
            <p onClick={switchVisibility} className="text-mb-green-200 cursor-pointer hover:underline">
              Hide All
            </p>
          </div>
          <div className="overflow-y-scroll scrollbar-color">
            {meetRegistrants.map((r: RegistrantsForMeet) => {
              return <MeetListUser meetRegistrant={r} />;
            })}
          </div>
        </div>
      </div>
    );
  } else {
    containerView = (
      <div className="bg-mb-green-200 min-w-lg min-h-screen flex justify-center items-center">
        <div className="bg-black min-w-lg rounded-md max-h-32 p-4">
          <div className="flex justify-between">
            <p className="text-white">{meetRegistrants.length} Attendees</p>
            <p onClick={switchVisibility} className="text-mb-green-200 cursor-pointer hover:underline">
              Show All
            </p>
          </div>
        </div>
      </div>
    );
  }

  return containerView;
};
