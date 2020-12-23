import React, { FC, useState } from "react";
import greyProfilePic from "../../../assets/images/logos/grey-profile-pic.svg";
import test from "../../../assets/images/logos/Test-Pic.svg";
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
        <div className="flex flex-col justify-between bg-black min-w-lg rounded-lg max-h-32 p-4">
          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center w-2/5 h-auto">
              <div className="flex h-8">
                {meetRegistrants.slice(0, 3).map((registrant: RegistrantsForMeet, i: number) => {
                  if (i === 0) {
                    return (
                      <div className="w-6 overflow-visible">
                        <img src={greyProfilePic} className="w-8 absolute" />
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-6 overflow-visible">
                        <img src={test} className="w-8 absolute" />
                      </div>
                    );
                  }
                })}
              </div>
              <p className="text-white font-bold">{meetRegistrants.length} Attendees</p>
            </div>
            <p onClick={switchVisibility} className="text-mb-green-200 cursor-pointer hover:underline">
              Hide All
            </p>
          </div>
          <div className="overflow-y-scroll scrollbar h-96">
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
        <div className="flex flex-col justify-between bg-black min-w-lg rounded-lg max-h-32 p-4">
          <div className="flex justify-between">
            <div className="flex justify-between items-center w-2/5 h-auto">
              <div className="flex h-8">
                {meetRegistrants.slice(0, 3).map((registrant: RegistrantsForMeet, i: number) => {
                  if (i === 0) {
                    return (
                      <div className="w-6 overflow-visible">
                        <img src={greyProfilePic} className="w-8 absolute" />
                      </div>
                    );
                  } else {
                    return (
                      <div className="w-6 overflow-visible">
                        <img src={test} className="w-8 absolute" />
                      </div>
                    );
                  }
                })}
              </div>
              <p className="text-white">{meetRegistrants.length} Attendees</p>
            </div>
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
