import React, { FC, useState } from "react";
import greyProfilePic from "../../../assets/images/logos/grey-profile-pic.svg";
import "./meetRegistrantsList.css"

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
          <div className="overflow-y-scroll">
          {meetRegistrants.map((r: RegistrantsForMeet) => {
            // This will be its own component
            return (
              <div className="flex align-center mt-6" key={r.id}>
                <img src={greyProfilePic} />
                <div className="ml-3">
                  <p className="text-mb-blue-300 font-bold">
                    {r.firstName} {r.lastName}
                  </p>
                  <p className="text-white font-light">Member since 2020</p>
                </div>
              </div>
            );
            //return statement end above to commment is MeetListUser component
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
