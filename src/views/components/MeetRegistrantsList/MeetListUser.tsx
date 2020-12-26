import React, { FC } from "react";
import { Avatar } from "../Avatar";

interface Props {
  meetRegistrant: RegistrantsForMeet;
}

export const MeetListUser: FC<Props> = ({ meetRegistrant }) => {
  const { firstName, lastName, createdAt } = meetRegistrant;

  const fullName = `${firstName} ${lastName}`;
  const memberSince = new Date(createdAt).getFullYear();

  return (
    <div className="flex items-center my-3">
      <Avatar size="sm" />
      <div className="ml-3 flex flex-col justify-center">
        <p className="text-mb-blue-300 font-bold mb-0 leading-4">{fullName}</p>
        <small className="text-white font-light mb-0">Member since {memberSince}</small>
      </div>
    </div>
  );
};
