import React, { FC, useEffect, useState } from "react";
import { MeetCard } from "../components/MeetCard";
// import { EventService } from "../../services/eventService";
import { Banner } from "../components/Banner";

const Meets: FC = () => {
  // const [events, setEvents] = useState([]);

  const testMeets: HackMeet[] = [
    {
      id: "fkjshdfkjsdhkfjh",
      meetType: "hackathon",
      coverImageUrl: "https://unsplash.com/photos/pduutGbL2-M",
      title: "test event",
      startTime: "1994-08-02T18:59",
      endTime: "1994-08-05T18:59",
      description: "test description",
      region: "America/Toronto",
      instructions: "make it happen",
      registerLink:
        "https://github.com/monarchwadia/MintbeanPlatformV2/blob/master/frontend/src/components/mb-banner.vue",
    },
    {
      id: "fkjshdfkjsdhkfjh",
      meetType: "hackathon",
      coverImageUrl: "https://unsplash.com/photos/pduutGbL2-M",
      title: "test event 2",
      startTime: "1994-08-02T18:59",
      endTime: "1994-08-05T18:59",
      description: "test description",
      region: "America/Toronto",
      instructions: "make it happen",
      registerLink:
        "https://github.com/monarchwadia/MintbeanPlatformV2/blob/master/frontend/src/components/mb-banner.vue",
    },
    {
      id: "fkjshdfkjsdhkfjh",
      meetType: "hackathon",
      coverImageUrl: "https://unsplash.com/photos/pduutGbL2-M",
      title: "test event 3",
      startTime: "1994-08-02T18:59",
      endTime: "1994-08-05T18:59",
      description: "test description",
      region: "America/Toronto",
      instructions: "make it happen",
      registerLink:
        "https://github.com/monarchwadia/MintbeanPlatformV2/blob/master/frontend/src/components/mb-banner.vue",
    },
  ];
  return (
    <div>
      <Banner title="Events" subtitle="Come hack with us" />
      {testMeets.map((meet) => (
        <MeetCard event={meet} key={meet.id} />
      ))}
    </div>
  );
};

export default Meets;
