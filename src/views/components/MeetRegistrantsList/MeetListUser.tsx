import React, { FC } from "react";
import greyProfilePic from "../../../assets/images/logos/grey-profile-pic.svg";

interface Props {
  meetRegistrant: RegistrantsForMeet;
}

export const MeetListUser: FC<Props> = ({ meetRegistrant }) => {
  return (
    <div className="flex align-center mt-6">
      <img src={greyProfilePic} />
      <div className="ml-3">
        <p className="text-mb-blue-300 font-bold">
          {meetRegistrant.firstName} {meetRegistrant.lastName}
        </p>
        <p className="text-white font-light">Member since {meetRegistrant.createdAt.split("-")[0]}</p>
      </div>
    </div>
  );
};
