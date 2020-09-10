import React from "react";
import { Modal } from "../wrappers/Modal";

// This default export determines where you story goes in the story list
export default {
  title: "Modal",
  component: Modal,
};

const Button = ({ open }) => {
  return <button onClick={open}>Click Me</button>;
};

const Template = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Modal {...args}>
      <p>This is an Example Modal</p>
    </Modal>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  size: "m",
  onSubmitHandler: () => alert("clicked"),
  triggerBuilder: (open) => <Button open={open} />,
};
