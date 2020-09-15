import React, { FC, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core/lib/enums";

type submissionBuilder = (submitFn: () => void) => ReactElement;

interface ModalAction {
  type: "primary" | "secondary" | "danger";
  text: string;
  callback: Function;
}

interface ModalProps {
  submissionHandler?: () => void;
  triggerBuilder: (
    stateFn: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  ) => ReactElement;
  submissionBuilder?: submissionBuilder;
  placement: Placement;
  actions: ModalAction[];
  // actions: ModalAction[];
}

export const Modal: FC<ModalProps> = ({
  submissionBuilder,
  triggerBuilder,
  submissionHandler,
  actions,
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

  const submit = () => {
    if (submissionHandler) {
      submissionHandler();
    }
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
        >
          <section className="w-full py-1 px-2 bg-gray-500 rounded-t-lg flex justify-end">
            <button
              className="border-red-500 active:bg-red-400 bg-white border-solid border-2 px-2 rounded-full"
              onClick={() => toggleShow(false)}
            >
              X
            </button>
          </section>
          <section className="max-w-4xl bg-mint flex p-2 justify-center items-center flex-col">{children}</section>
          <section className="w-full bg-gray-500 rounded-b-lg flex py-1 px-2 justify-end">
            {actions && actions.map((action) => <ModalActionButton {...action} />)}
          </section>
          <div ref={(el) => setArrowElement(el)} style={styles.arrow} />
        </section>
      )}
    </>
  );
};

const ModalActionButton: FC<ModalAction> = ({ type, text, callback }): ReactElement => {
  const commonClasses = "border-solid border-2 p-2 m-2";
  const classes = {
    primary: "text-whit bg-mint border-mint",
    secondary: "text-mint bg-white border-mint",
    danger: "bg-red-500 border-red-500",
  };

  return (
    <button onClick={() => callback()} className={`${commonClasses} ${classes[type]}`}>
      {text}
    </button>
  );
};
//
// <section className="w-full bg-gray-500 rounded-b-lg flex py-1 px-2 justify-end">
//   {submissionBuilder ? (
//     submissionBuilder(submit)
//   ) : (
//     <button
//       className="border-mint active:bg-mint bg-white border-solid border-2 p-1 rounded-lg"
//       onClick={submit}
//     >
//       Okay!
//     </button>
//   )}
// </section>
