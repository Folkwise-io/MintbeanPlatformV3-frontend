import React, { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MbContext } from "../../context/MbContext";
import { Meet } from "../../types/meet";
import { ProjectForMeet } from "../../types/project";
import { Button } from "./blocks/Button";
import { H2 } from "./blocks/H2";

type UpcomingMeetProps = {
  project: ProjectForMeet;
  userState: User | undefined;
};

export const UpcomingMeet: FC<UpcomingMeetProps> = () => {
  const ctx = useContext(MbContext);
  const [nextMeets, setNextMeets] = useState<Meet[]>([]);
  const history = useHistory();

  const goToMeets = () => {
    history.push("");
  };

  const mapMeets = () => {
    return nextMeets.map((meet) => (
      <>
        {/* TODO @theFl00f meet card stuff stuff */}
        <h1>{meet.title}</h1>
      </>
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
    <section className="w-full">
      <H2 className="text-white">Upcoming Meets</H2>
      <div>{/* TODO Celeste component here */}</div>
      <Button buttonStyle={"secondary"} onClick={goToMeets}>
        See More
      </Button>
    </section>
  );
};
