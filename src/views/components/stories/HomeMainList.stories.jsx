import React from "react";
import { MainList } from "../HomeMainList";

export default {
  title: "HomeMainList",
  component: MainList,
};

const Template = (args) => <MainList list={args} />;

export const Primary = Template.bind({});

Primary.args = {
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
