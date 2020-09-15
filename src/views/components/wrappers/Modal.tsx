import React, { FC, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core/lib/enums";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface ModalAction {
  type: "primary" | "secondary" | "danger";
  text: string;
  callback: (close?: React.Dispatch<React.SetStateAction<boolean>>) => any | null;
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

/* TODO: make Modal context (closeModal...) accessible from actions callback. For now, all action buttons close on completion */

interface ModalProps {
  triggerBuilder: (
    stateFn: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  ) => ReactElement;
  placement: Placement;
  actions?: ModalAction[];
  title?: string;
}

export const Modal: FC<ModalProps> = ({
  triggerBuilder,
  actions,
  title,
  children,
  placement = "bottom",
}): ReactElement => {
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
  const [show, toggleShow] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(triggerRef, popperElement, {
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
    placement: placement,
  });

  const closeModal = () => {
    toggleShow(false);
  };

  return (
    <>
      {triggerBuilder(
        () => toggleShow(!show),
        (el) => setTriggerRef(el),
      )}
      {show && (
        <section
          ref={(el) => setPopperElement(el)}
          style={styles.popper}
          {...attributes.popper}
          data-popper-placement="right"
          className="max-w-screen-sm bg-gray-100 p-3 shadow-xl bg-white rounded-md"
        >
          {/* modal header */}
          <section className="py-1 px-2 flex justify-end text-gray-400">
            <button className="active:bg-mint px-2 rounded-full" onClick={closeModal}>
              Close
            </button>
          </section>
          {/* modal body */}
          <section className="flex p-4 justify-center items-center flex-col">
            {title && <div className="font-semibold text-lg text-gray-700 mb-2">{title}</div>}
            <div className="my-2">{children}</div>
          </section>
          {/* modal actions */}
          <section className="flex py-1 px-2 justify-center">
            {actions && actions.map((action) => <ModalActionButton {...action} closeModal={closeModal} />)}
          </section>
          <div ref={(el) => setArrowElement(el)} style={styles.arrow} />
        </section>
      )}
    </>
  );
};

interface ModalActionButtonProps {
  closeModal: () => void;
}

const ModalActionButton: FC<ModalAction & ModalActionButtonProps> = ({
  type,
  text,
  callback,
  closeModal,
}): ReactElement => {
  const commonClasses = "shadow-md border-solid border-2 rounded-md py-2 px-6 m-2";
  const classes = {
    primary: "text-white bg-mint border-mint ",
    secondary: "text-black bg-white border-mint",
    danger: "text-white bg-red-500 border-red-500",
  };

  const executeAndClose = () => {
    callback();
    closeModal();
  };

  return (
    <button onClick={executeAndClose} className={`${commonClasses} ${classes[type]}`}>
      {text}
    </button>
  );
};
