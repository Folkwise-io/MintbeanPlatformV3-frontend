import React, { FC, useEffect, useState } from "react";
import { MeetCard } from "../components/MeetCard";
// import { EventService } from "../../services/eventService";
import { Banner } from "../components/Banner";

const Meets: FC<void> = () => {
  // const [events, setEvents] = useState([]);

  const testMeets: HackMeet[] = [
    {
      id: "1",
      meetType: "hackathon",
      coverImageUrl:
        "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      id: "2",
      meetType: "hackathon",
      coverImageUrl:
        "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
      id: "3",
      meetType: "hackathon",
      coverImageUrl:
        "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
