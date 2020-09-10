import React, { FC, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import "./styles/modal.css";

type submissionHandler = () => void;

interface ModalProps {
  submissionHandler?: submissionHandler;
  triggerBuilder: (
    stateFn: React.Dispatch<React.SetStateAction<boolean>>,
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  ) => ReactElement;
  submissionBuilder: (
    stateFn: React.Dispatch<React.SetStateAction<false>>,
    submitFn: submissionHandler | null,
  ) => ReactElement;
  placement: "left" | "top" | "bottom";
}

export const Modal: FC<ModalProps> = ({
  submissionBuilder,
  triggerBuilder,
  submissionHandler,
  children,
  placement = "bottom",
}): ReactElement => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const [show, toggleShow] = useState(true);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
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

  return (
    <>
      {triggerBuilder(
        () => toggleShow(true),
        (el) => setReferenceElement(el),
      )}
      {show && (
        <section
          ref={(el) => setPopperElement(el)}
          style={styles.popper}
          {...attributes.popper}
          data-popper-placement="right"
        >
          <section className="w-full py-1 px-2 bg-gray-500 rounded-t-lg flex justify-end">
            <button onClick={() => toggleShow(false)}>X</button>
          </section>
          <section className="max-w-4xl bg-mint flex p-2 justify-center items-center flex-col">{children}</section>
          <section className="w-full bg-gray-500 rounded-b-lg flex px-2 justify-end">
            {submissionHandler
              ? submissionBuilder(() => toggleShow(false), submissionHandler)
              : submissionBuilder(() => toggleShow(false), null)}
          </section>
          <div ref={(el) => setArrowElement(el)} style={styles.arrow} />
        </section>
      )}
    </>
  );
};
