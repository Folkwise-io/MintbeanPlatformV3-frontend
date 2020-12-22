import React, { FC, useState } from "react";
import greyProfilePic from "../../../assets/images/logos/grey-profile-pic.svg";

interface Props {
  meetRegistrants: RegistrantsForMeet[];
}

export const MeetRegistrantsList: FC<Props> = ({ meetRegistrants }) => {
  const [visible, setVisible] = useState<boolean>(true);

  let containerView;

  if (visible) {
    containerView = (
      <div className="bg-white max-w-sm">
        <div>
          <p>{meetRegistrants.length} Attendees</p>
          <p className="text-">Hide All</p>
        </div>

        {meetRegistrants.map((r: RegistrantsForMeet) => {
          return (
            <div key={r.id}>
              <img src={greyProfilePic} />
              <p className="text-white">{r.id}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    containerView = <h1>asdasd</h1>;
  }

  return containerView;
};
