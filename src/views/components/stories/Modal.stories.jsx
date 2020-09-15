import React from "react";
import { Modal } from "../wrappers/Modal";
import axe from "../../../assets/small-axe.png";

// This default export determines where you story goes in the story list
export default {
  title: "Modal",
  component: Modal,
};

const submitBuilder = (submitFn) => {
  return <button onClick={submitFn}>Click Me To Submit</button>;
};

const triggerBuilder = (stateFn, setRef) => {
  return (
    <button onClick={() => stateFn()} ref={(el) => setRef(el)}>
      Click to Open Modal
    </button>
  );
};

const triggerBuilder2 = (stateFn, setRef) => {
  return (
    <button onClick={() => stateFn()} ref={(el) => setRef(el)}>
      Click to Open Modal 2
    </button>
  );
};

const Template = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Modal {...args}>
      <p className="mb-2">Try this fun action</p>
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
  triggerBuilder: (stateFn, setRef) => triggerBuilder(stateFn, setRef),
  submissionBuilder: (submitFn) => submitBuilder(submitFn),
  submissionHandler: () => {
    alert(document.getElementById("heathcliff").value);
  },
  placement: "bottom",
  actions: [
    { type: "danger", text: "DANGER", callback: () => alert("You did something risky.") },
    {
      type: "secondary",
      text: "Cancel",
      callback: null,
    },
    { type: "primary", text: "Alert", callback: () => alert(document.getElementById("heathcliff").value) },
  ],
  title: "Test modal",
};

Secondary.args = {
  triggerBuilder: (stateFn, setRef) => triggerBuilder2(stateFn, setRef),
  submissionHandler: () => {
    alert("clicked");
  },
  placement: "left",
};
