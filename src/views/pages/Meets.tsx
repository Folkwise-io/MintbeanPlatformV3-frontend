import React, { FC, useState, useEffect } from "react";
import { MeetCard } from "../components/MeetCard";
import { Banner } from "../components/Banner";
import { ConnectContextProps, connectContext } from "../../context/connectContext";
import { DateUtility } from "../../utils/DateUtility";

//TODO: Remove these fake meets. Filling in for missing seeds right now to show page style
import { meetFactory } from "../../../test/src/factories/meet.factory";
import { BgBlock } from "../components/BgBlock";
import { FocusCard } from "../components/FocusCard";
const fakePastMeets = meetFactory.bulk(10);

const d = new DateUtility();

// if this component were to take props, use this type instead:
// interface Props extends ConnectContextProps { component props...}
const Meets: FC<ConnectContextProps> = ({ context }) => {
  const [meets, setMeets] = useState<HackMeet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMeetData = async () => {
      if (!context) {
        console.error(new Error("No context passed to component, but was expected"));
        alert("Blame the devs! Something terrible happened.");
        return;
      }
      setLoading(true);
      const fetchedMeets = await context.meetService.fetchMeets();
      setMeets(fetchedMeets);
      setLoading(false);
    };

    fetchMeetData();
  }, [context]);

  // const upcomingMeets = meets
  //   .filter((m: HackMeet) => !d.isPast(m.startTime, m.region))
  //   .map((meet) => <MeetCard meet={meet} key={meet.id} />);
  const upcomingMeets = fakePastMeets
    .filter((m: HackMeet) => !d.isPast(m.startTime, m.region))
    .map((meet) => <MeetCard meet={meet} key={meet.id} />);

  // ** SAVE below **
  // const pastMeets = meets
  //   .filter((m: HackMeet) => d.isPast(m.endTime, m.region))
  //   .map((meet) => <MeetCard meet={meet} key={meet.id} />);

  // TOOD: delete dummy meets below and uncomment lines for real pastMeets above in prod
  const pastMeets = fakePastMeets.map((meet) => <MeetCard meet={meet} key={meet.id} />);

  const cardProps = {
    title: "Events",
    description: "Come hack with us",
  };
  return (
    <div>
      <BgBlock type="gradStripeEvents">
        <BgBlock type="blackStripeEvents">
          <header className="py-24">
            <FocusCard type="eventsTitle" card={cardProps} />
          </header>
        </BgBlock>
        <main className="py-12">
          <BgBlock type="blackStripe">
            <BgBlock>
              <section
                className="rounded-xl container mx-auto max-w-screen-md mb-12 flex flex-col items-center px-4 py-8"
                style={{ background: "linear-gradient(0deg, black, #3d3d3d)" }}
              >
                <h2 className="text-4xl text-white mb-4">Upcoming events</h2>
                {loading ? (
                  <p className="text-white">Loading...</p>
                ) : upcomingMeets.length ? (
                  <div className="space-y-4">{upcomingMeets}</div>
                ) : (
                  <p className="text-white text-lg">No upcoming events at the moment... Stay tuned!</p>
                )}
              </section>
            </BgBlock>
            <section className="container mx-auto max-w-screen-md mb-12 flex flex-col items-center p-4">
              <h2 className="text-4xl mb-4">Past events</h2>
              <div className="space-y-4">{pastMeets}</div>
            </section>
          </BgBlock>
        </main>
      </BgBlock>
    </div>
  );
};

export default connectContext<ConnectContextProps>(Meets);
