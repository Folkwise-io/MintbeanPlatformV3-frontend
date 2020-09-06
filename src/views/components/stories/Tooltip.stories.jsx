import React from "react";
import { Tooltip } from "../wrappers/Tooltip";

// This default export determines where you story goes in the story list
export default {
  title: "Tooltip",
  component: Tooltip,
};

const Template = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Tooltip duration={args.duration} tip={args.tip} direction={args.direction} delay={args.delay}>
      <button>Hover Over Me</button>
    </Tooltip>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  duration: 3000,
  delay: 0,
  tip: "Tip Text",
};
