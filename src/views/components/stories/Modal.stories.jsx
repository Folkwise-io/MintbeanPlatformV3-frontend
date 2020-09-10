import React from "react";
import { Modal } from "../wrappers/Modal";

// This default export determines where you story goes in the story list
export default {
  title: "Modal",
  component: Modal,
};

const ExButton = ({ stateFn, submitFn, setRef, children }) => {
  const submit = () => {
    stateFn();
    submitFn();
  };
  console.log(setRef);
  if (setRef) {
    return (
      <button onClick={() => stateFn()} ref={(el) => setRef(el)}>
        {children}
      </button>
    );
  } else {
    return <button onClick={submit}>{children}</button>;
  }
};

const Template = (args) => (
  <div className="w-full flex justify-center h-64 items-center">
    <Modal {...args}>
      <p>This is an Example Modal</p>
      <input id="heathcliff" type="text" />
    </Modal>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  triggerBuilder: (stateFn, setRef) => (
    <ExButton stateFn={stateFn} setRef={setRef}>
      Click Me To Open Modal
    </ExButton>
  ),
  submissionBuilder: (stateFn, submitFn) => (
    <ExButton submitFn={submitFn} stateFn={stateFn}>
      Click Me To Submit Modal
    </ExButton>
  ),
  submissionHandler: () => {
    alert(document.getElementById("heathcliff").value);
  },
  placement: "left",
};
