import React, { FC, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core/lib/enums";
import { ModalActionButton, ModalActionDeclaration } from "./ModalActionButton";

interface ModalProps {
  triggerBuilder: (
    toggleModal: () => void,
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  ) => ReactElement;
  placement?: Placement;
  actions?: ModalActionDeclaration[];
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

  // Wrap the triggerable element with the modal
  // TODO: refactor modal so that trigger can be decoupled
  const triggers = triggerBuilder(
    () => toggleShow(!show),
    (el) => setTriggerRef(el),
  );

  const actionButtons = actions
    ? actions.map((action: ModalActionDeclaration, i: number) => {
        return <ModalActionButton {...action} closeModal={closeModal} key={i} />;
      })
    : [];

  return (
    <>
      {
        // render the trigger element so it can be clicked
        triggers
      }
      {
        // This is the modal itself. It only shows if the trigger was clicked.
        show && (
          <div
            ref={(el) => setPopperElement(el)}
            style={styles.popper}
            {...attributes.popper}
            data-popper-placement="right"
            className="bg-gray-100 p-3 shadow-xl rounded-md border-2 border-mb-green-200 max-w-screen-sm"
          >
            {/* modal header with the "X" button for closing the modal */}
            <section className="py-1 px-2 flex justify-end text-gray-400">
              <button className="active:bg-mb-green-200 px-2 rounded-full" onClick={closeModal}>
                Close
              </button>
            </section>
            {/* modal body that displays the children */}
            <section className="flex p-4 justify-center items-center flex-col">
              {title && <div className="font-semibold text-lg text-gray-700 mb-2">{title}</div>}
              <div className="my-2">
                {
                  // Render the children, i.e. the body of the modal
                  children
                }
              </div>
            </section>
            {/* modal actions */}
            <section className="flex py-1 px-2 justify-center">{actionButtons}</section>
            <div ref={(el) => setArrowElement(el)} style={styles.arrow} />
          </div>
        )
      }
    </>
  );
};
