import React from "react";
import { HomeHeaderList } from "../HomeHeaderList";

export default {
  title: "HomeHeaderList",
  component: HomeHeaderList,
};

const Template = (args) => <HomeHeaderList list={args} />;

export const Primary = Template.bind({});

Primary.args = {
  titles: ["We're a FREE community built just for you.", "Bring your friends!", "What's in it for us?"],
};
