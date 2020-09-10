import React, { FC, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import "./styles/modal.css";
import { placements } from "@popperjs/core";

// interface ModalProps {
//   onSubmitHandler?: () => void;
//   triggerBuilder: (trigger: React.Dispatch<React.SetStateAction<boolean>>) => ReactElement;
// }
export const Modal = (): ReactElement => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [show, toggleShow] = useState(false);
  const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "flip", enabled: true, phase: "main" },
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
    placement: "left",
  });
  console.log(state);
  
  return (
    <>
      <button onClick={() => toggleShow(!show)} type="button" ref={setReferenceElement}>
        Reference element
      </button>
      {show && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} data-popper-placement="right">
          Popper element
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </>
  );
};
