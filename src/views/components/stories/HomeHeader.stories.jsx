import React from "react";
import { HomeHeader } from "../HomeHeader";

export default {
  title: "HomeHeader",
  component: HomeHeader,
};

const Template = (args) => <HomeHeader header={args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "Calling all web developers!",
};
