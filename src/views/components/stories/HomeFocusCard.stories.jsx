import React from "react";
import { HomeFocusCard } from "../HomeFocusCard";

export default {
  title: "HomeFocusCard",
  component: HomeFocusCard,
};

const Template = (args) => <HomeFocusCard card={args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "Build cool projects and elevate your skills.",
  description:
    "We have events, workshops and competitions that build your skills, help you make friends, and let you create a dazzling coding portfolio. Here are a few FREE programs that you can be a part of:",
};
