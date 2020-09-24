import React, { FC, Fragment } from "react";
import { HomeHeader } from "./HomeHeader";
import { FocusCard } from "../../components/FocusCard";
import { MainList } from "./HomeMainList";

const Home: FC<void> = () => {
  const headerArgs = { title: "Calling all web developers!" };
  const cardArgs = {
    title: "Build cool projects and elevate your skills.",
    description:
      "We have events, workshops and competitions that build your skills, help you make friends, and let you create a dazzling coding portfolio. Here are a few FREE programs that you can be a part of: ",
  };
  const listArgs = {
    titles: ["Code mentorship", "Workshops", "Live speakers", "Masterclass", "Competitions", "Dev Evangelist Program"],
    content: [
      `Help other devs with your knowledge and expertise, and add “volunteer code mentor” to your resume.`,
      `Learn new skills and technologies with us with the luxury of a live chat.`,
      `Listen to what the experts have to say about the future of JavaScript, often with a Q&A.`,
      `Learn frameworks and modules from the creators themselves.`,
      `Flex your competitive side and join our hackathons, twice weekly. We have challenges for devs of all levels!`,
      `Love talking to people? Come learn how to communicate effectively in public about technology you know and love.`,
    ],
  };
  return (
    <Fragment>
      <div className="bg-mb-blue-100 pt-2 pb-8 rounded-mb-md border-t-8 border-b-8 border-mb-green-200">
        <div className="bg-black w-full pt-12 pb-24 px-2 rounded-mb-md grid place-content-center">
          <HomeHeader header={headerArgs} />
          <FocusCard card={cardArgs} />
          <MainList list={listArgs} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
