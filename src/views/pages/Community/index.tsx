import React, { FC } from "react";
import { Main } from "./CommunityMain";

const Community: FC<void> = () => {
  const headerArgs = {
    title: "The Mintbean Community",
    tagline: "Write code. Get noticed. Get hired.",
    body: `At Mintbean, we give you an active and engaged platform where you can build the habit of practice around code with developers of all levels. 

    Share knowledge, personality, and of course, friendship.`,
  };
  return <Main main={headerArgs} />;
};

export default Community;
