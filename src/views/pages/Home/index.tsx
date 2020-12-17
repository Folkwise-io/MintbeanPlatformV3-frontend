import React, { FC } from "react";
import { HomeHeader } from "./HomeHeader";
import { FocusCard } from "../../components/FocusCard";
import { MainList } from "./HomeMainList";
import NextMeetSection from "../../components/NextMeetSection";
import { Link } from "react-router-dom";
import BlockWrapper from "../../components/wrappers/BlockWrapper";

interface StateMapping {
  user: UserState;
}

const Home: FC<StateMapping> = () => {
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
    <BlockWrapper className="grid place-content-center">
      <NextMeetSection />
      <Link
        to={`/meets/`}
        className="bg-mb-purple-100 text-center px-8 py-4 mx-12 md:mx-auto max-w-2xl rounded-mb-sm border-mb-green-100 border-solid border-8 inline-block mb-8"
      >
        {" "}
        <p className="text-3xl text-white break-words">For all upcoming meets</p>
        <div className="text-semibold mb-transition text-4xl hover:text-mb-orange-100 focus:text-mb-orange-100">
          Click here.
        </div>
      </Link>
      <HomeHeader header={headerArgs} />
      <FocusCard card={cardArgs} />
      <MainList list={listArgs} />
    </BlockWrapper>
  );
};

export default Home;
