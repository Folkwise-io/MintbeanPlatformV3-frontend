import React, { FC, useState, useEffect } from "react";
import { MeetCard } from "../components/MeetCard";
import { Banner } from "../components/Banner";
import { ConnectContextProps, connectContext } from "../../context/connectContext";

// if this component were to take props, use this type instead:
// interface Props extends ConnectContextProps { component props...}

const Meets: FC<ConnectContextProps> = ({ context }) => {
  const [meets, setMeets] = useState<HackMeet[]>([]);

  useEffect(() => {
    /* TODO: move handling to service */
    const fetchMeetData = async () => {
      /* TODO: why does typescript complain if this not here? */
      if (typeof context === "undefined") {
        alert("Blame the devs! Something terrible happened.");
        return;
      }
      try {
        const fetchedMeets = await context.meetService.fetchMeets();
        if (fetchedMeets) setMeets(fetchedMeets);
      } catch (e) {
        context.loggerService.handleGraphqlErrors(e);
      }
    };
    fetchMeetData();
  }, [context]);

  const upcomingMeets = meets
    .filter((m: HackMeet) => m.startTime)
    .map((meet) => <MeetCard meet={meet} key={meet.id} />);
  const pastMeets = meets.map((meet) => <MeetCard meet={meet} key={meet.id} />);

  return (
    <div>
      <header>
        <Banner title="Events" subtitle="Come hack with us" />
      </header>
      <main className="py-12 ">
        <section
          className="rounded-xl container mx-auto max-w-screen-md mb-12 flex flex-col items-center px-4 py-8"
          style={{ background: "linear-gradient(0deg, black, #3d3d3d)" }}
        >
          {upcomingMeets.length ? (
            <h2 className="text-4xl text-white mb-4">Upcoming events</h2>
          ) : (
            <p className="text-white text-lg">No upcoming events at the moment... Stay tuned!</p>
          )}

          {upcomingMeets.length && <div className="space-y-4">{upcomingMeets}</div>}
        </section>
        <section className="container mx-auto max-w-screen-md mb-12 flex flex-col items-center p-4">
          <h2 className="text-4xl mb-4">Past events</h2>
          <div className="space-y-4">{pastMeets}</div>
        </section>
      </main>
    </div>
  );
};

export default connectContext<ConnectContextProps>(Meets);
