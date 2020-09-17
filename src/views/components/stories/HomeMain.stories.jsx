import React from "react";
import { MainWrapper } from "../MainWrapper";
import { HomeHeader } from "../HomeHeader";
import { HomeFocusCard } from "../HomeFocusCard";

export default {
  title: "Main",
  component: MainWrapper,
};

const Template = () => {
  const args = { title: "Calling all web developers!" };
  const cardArgs = {
    title: "Build cool projects and elevate your skills.",
    description:
      "We have events, workshops and competitions that build your skills, help you make friends, and let you create a dazzling coding portfolio. Here are a few FREE programs that you can be a part of:",
  };
  return (
    <MainWrapper>
      <HomeHeader header={args} />
      <HomeFocusCard card={cardArgs} />
    </MainWrapper>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  title: "Calling all web developers!",
};
