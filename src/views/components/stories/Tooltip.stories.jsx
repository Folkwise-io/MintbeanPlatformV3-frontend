import React from "react";
import { Tooltip } from "../wrappers/Tooltip";

// This default export determines where you story goes in the story list
export default {
  title: "Tooltip",
  component: Tooltip,
};

const Template = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Tooltip {...args}>
      <button className="px-2 py-1 border-green-400 rounded-lg border-2 bg-green-300">Hover Over Me</button>
    </Tooltip>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  message: "Tip Text",
};
