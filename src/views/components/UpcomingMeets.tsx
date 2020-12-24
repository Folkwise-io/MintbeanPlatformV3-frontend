import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/contextBuilder";
import { MbContext } from "../../context/MbContext";
import { Meet } from "../../types/meet";
import { Button } from "./blocks/Button";
import { MeetCard } from "./MeetCard/MeetCard";

export const UpcomingMeets: FC = () => {
  const context = useContext<Context>(MbContext);
  const isUnmounted = useRef<boolean>(false);
  const [nextMeets, setNextMeets] = useState<Meet[]>([]);

  const mapMeets = () => {
    return nextMeets.map((meet, i) => <MeetCard key={i} meet={meet} semiOpaqueLabels />);
  };

  const getNextMeets = useCallback(async () => {
    const meets = await context.meetService.fetchMeets();
    if (!meets) {
      return;
    }
    if (!isUnmounted.current) {
      setNextMeets(meets.slice(0, 2));
    }
  }, [context.meetService]);

  useEffect(() => {
    getNextMeets();
    // cleanup on unmount. This is needed to prevent memory leak of orphaned state updaters
    return () => {
      isUnmounted.current = true;
    };
  }, [getNextMeets]);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h2 className="font-semi-bold py-2 self-start">Upcoming Meets</h2>
      <div className="grid grid-cols-1 mb-4 row-auto gap-4">{mapMeets()}</div>
      <Link to="/">
        <Button buttonStyle={"secondary"}>See More</Button>
      </Link>
    </section>
  );
};
