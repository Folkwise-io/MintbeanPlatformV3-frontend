import React, { FC, useEffect, useState } from "react";
import { EventCard } from "../components/EventCard";
import { EventService } from "../../services/eventService";

const Home: FC = () => {
  //   const [events, setEvents] = useState([]);

  const testEvents: HackEvent = [
    {
      image:
        "https:media-exp1.licdn.com/dms/image/C4E03AQF9KRGV4uTT5w/profile-displayphoto-shrink_800_800/0?e=1604534400&v=beta&t=81hJweo7wTDr4aIW9pGLsNdFLVsS4h460TBvQNr_8s8",
      name: "test event",
      startDate: new Date("1994-08-02T18:59:50.006Z"),
      endDate: new Date("1994-08-05T18:59:50.006Z"),
      description: "test description",
      sponsors: [],
    },
  ];
  return (
  <section>
      {testEvents.forEach(event => <EventCard event={event} />)}
  </section>
  );
};

export default Home;
