import React, { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MbContext } from "../../context/MbContext";
import { Meet } from "../../types/meet";
import { Button } from "./blocks/Button";
import { H2 } from "./blocks/H2";
import { MeetCard } from "./MeetCards/MeetCard";

export const UpcomingMeets: FC = () => {
  const ctx = useContext(MbContext);
  const [nextMeets, setNextMeets] = useState<Meet[]>([]);
  const history = useHistory();

  const goToMeets = () => {
    history.push("");
  };

  // <div
  //   className="border border-red-600 text-white border-solid items-center justify-center overflow-hidden rounded-lg flex flex-col"
  //   key={index + meet.title}
  // >
  //   <div className="h-64 flex-grow">
  //     {meet.title}
  //     <p>this is a dummy card @theFl00f meet card component will replace this</p>
  //   </div>
  // </div>;
  const mapMeets = () => {
    /* TODO @theFl00f meet card stuff will replace the following */
    return nextMeets.map((meet, i) => (
      <MeetCard key={i} meet={meet} semiOpaqueLabels onDelete={() => console.log("foo")} />
    ));
  };

  const getNextMeets = async () => {
    const meets = await ctx.meetService.fetchMeets();
    if (!meets) {
      return;
    }
    setNextMeets(meets.slice(0, 2));
  };

  useEffect(() => {
    getNextMeets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h2 className="font-semi-bold py-2 self-start">Upcoming Meets</h2>
      <div className="grid grid-cols-1 mb-4 row-auto gap-4">{mapMeets()}</div>
      <Button buttonStyle={"secondary"} onClick={goToMeets}>
        See More
      </Button>
    </section>
  );
};
