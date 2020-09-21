import React, { FC, useState, useEffect } from "react";
import { MeetCard } from "../components/MeetCard";
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

  const upcomingMeets = meets
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
    description: "Come hack with us!",
  };
  return (
    <div>
      <BgBlock type="gradStripeEvents">
        <BgBlock type="blackStripeEvents">
          <header className="pt-8 pb-6 flex justify-center">
            <FocusCard type="eventsTitle" card={cardProps} />
          </header>
        </BgBlock>
        <main className="">
          <BgBlock type="black">
            <BgBlock>
              <section className="rounded-xl mb-16 flex flex-col items-center w-full py-8 bg-black max-w-6xl shadow-mb-drop-center">
                <h2 className="text-4xl text-white mb-4 font-semibold text-center">Upcoming events</h2>
                {loading ? (
                  <p className="text-white">Loading...</p>
                ) : upcomingMeets.length ? (
                  <div className="space-y-4">{upcomingMeets}</div>
                ) : (
                  <p className="text-white text-lg">No upcoming events at the moment... Stay tuned!</p>
                )}
              </section>
            </BgBlock>
            <section className="max-w-5xl mx-auto flex flex-col items-center pt-12 pb-24 md:pb-12 px-6 md:px-24">
              <h2 className="text-white text-4xl mb-4 text-center">Past events</h2>
              <div className="space-y-4">{pastMeets}</div>
            </section>
          </BgBlock>
        </main>
      </BgBlock>
    </div>
  );
};

export default connectContext<ConnectContextProps>(Meets);
