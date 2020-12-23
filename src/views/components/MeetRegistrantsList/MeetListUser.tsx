import React, { FC } from "react";
import greyProfilePic from "../../../assets/images/logos/grey-profile-pic.svg";

interface Props {
  meetRegistrant: RegistrantsForMeet;
}

export const MeetListUser: FC<Props> = ({ meetRegistrant }) => {
  const { firstName, lastName, createdAt } = meetRegistrant;

  const fullName =`${firstName} ${lastName}`;
  const memberSince = new Date(createdAt).getFullYear();

  return (
    <div className="flex align-center mt-6">
      <img src={greyProfilePic} />
      <div className="ml-3">
        <p className="text-mb-blue-300 font-bold">{fullName}</p>
        <p className="text-white font-light">Member since {memberSince}</p>
      </div>
    </div>
  );
};
