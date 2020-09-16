import React, { FC, useState, useEffect } from "react";
import { MeetCard } from "../components/MeetCard";
import { Banner } from "../components/Banner";
import { ConnectContextProps, connectContext } from "../../context/connectContext";

interface Props extends ConnectContextProps {}

const Meets: FC<Props> = ({ context }) => {
  const [meets, setMeets] = useState<HackMeet[]>([]);

  useEffect(() => {
    const fetchMeetData = async () => {
      const fetchedMeets = await context?.meetService.fetchMeets();
      if (fetchedMeets) setMeets(fetchedMeets);
    };
    fetchMeetData();
  }, []);

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

  const dummyEvents = meets.map((meet) => <MeetCard event={meet} key={meet.id} />);

  return (
    <div>
      <header>
        <Banner title="Events" subtitle="Come hack with us" />
      </header>
      <main className="py-12 ">
        <section
          className="rounded-xl container mx-auto max-w-screen-lg mb-12 flex flex-col items-center px-4 py-8"
          style={{ background: "linear-gradient(0deg, black, #3d3d3d)" }}
        >
          <h2 className="text-4xl text-white mb-4">Upcoming events</h2>
          <div className="space-y-4">{dummyEvents}</div>
        </section>
        <section className="container mx-auto max-w-screen-md mb-12 flex flex-col items-center p-4">
          <h2 className="text-4xl mb-4">Past events</h2>
          <div className="space-y-4">{dummyEvents}</div>
        </section>
      </main>
    </div>
  );
};

export default connectContext<Props>(Meets);
