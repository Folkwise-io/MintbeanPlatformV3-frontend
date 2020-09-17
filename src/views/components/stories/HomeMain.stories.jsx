import React from "react";
import { MainWrapper } from "../../pages/StaticHome/HomeMainWrapper";
import { HomeHeader } from "../../pages/StaticHome/HomeHeader";
import { HomeFocusCard } from "../HomeFocusCard";
import { MainList } from "../HomeMainList";

export default {
  title: "_HomeMain",
  component: MainWrapper,
};

const Template = () => {
  const headerArgs = { title: "Calling all web developers!" };
  const cardArgs = {
    title: "Build cool projects and elevate your skills.",
    description:
      "We have events, workshops and competitions that build your skills, help you make friends, and let you create a dazzling coding portfolio. Here are a few FREE programs that you can be a part of:",
  };
  const listArgs = {
    titles: [
      "Code mentorship.",
      "Workshops.",
      "Live speakers.",
      "Masterclass",
      "Competitions",
      "Dev Evangelist Program.",
    ],
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
    <MainWrapper>
      <HomeHeader header={headerArgs} />
      <HomeFocusCard card={cardArgs} />
      <MainList list={listArgs} />
    </MainWrapper>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  title: "Calling all web developers!",
};
