import React from "react";
import { Modal } from "../wrappers/Modal";
import axe from "../../../assets/small-axe.png";

// This default export determines where you story goes in the story list
export default {
  title: "Modal",
  component: Modal,
};

const Template = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Modal {...args}>
      <p className="mb-2">
        <strong>The button actions don not work in storybook.</strong>
      </p>
      <p className="mb-2">Trust me, it works</p>
      <input
        className="p-2 border-gray-500 border-solid border-2 rounded"
        placeholder="Enter text"
        id="heathcliff"
        type="text"
      />
    </Modal>
  </div>
);

const Template2 = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Modal {...args}>
      <img className="w-20" src={axe} alt="axe icon" />
    </Modal>
  </div>
);

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});

Primary.args = {
  // storybook doesn't like the triggerBuilder this for some reason
  /*eslint-disable */
  triggerBuilder: (toggleModal, setRef) => (
    <button onClick={toggleModal} ref={(el) => setRef(el)}>
      Click to Open Modal
    </button>
  ),

  placement: "bottom",
  actions: [
    { type: "danger", text: "DANGER", callback: () => alert("You did something risky.") },
    {
      type: "secondary",
      text: "Cancel",
      callback: (evt, { closeModal }) => closeModal(),
    },
    {
      type: "primary",
      text: "Alert",
      callback: (evt, { closeModal }) => {
        alert("You shouldn't have!");
        closeModal();
      },
    },
  ],
  title: "Test modal",
};

Secondary.args = {
  triggerBuilder: (toggleModal, setRef) => (
    <button onClick={toggleModal} ref={(el) => setRef(el)}>
      Click to Open Modal
    </button>
  ),
  submissionHandler: () => {
    alert("clicked");
  },
  placement: "left",
};
/*eslint-enable */
