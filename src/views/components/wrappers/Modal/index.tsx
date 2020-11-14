import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
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
  closeFromParent?: number;
  isDetached?: boolean;
  hasRelativeParent?: boolean;
}
// style for centering modal in middle of screen if isDetached prop = true
const detachedStyles = {
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,
  overflow: "auto",
  maxHeight: "80vh",
  maxWidth: "90vw",
} as React.CSSProperties;

const relativeStyles = {
  zIndex: 89,
  overflow: "auto",
  maxWidth: "90vw",
} as React.CSSProperties;

export const Modal: FC<ModalProps> = ({
  triggerBuilder,
  actions,
  title,
  children,
  closeFromParent,
  placement = "bottom",
  isDetached = false,
  hasRelativeParent = false,
}): ReactElement => {
  const isUnmounted = useRef<boolean>(false);
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

  useEffect(() => {
    // cleanup on unmount. This is important to prevent memory leak of orphaned state updaters if modal is deleted
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (closeFromParent) {
      closeModal();
    }
    // eslint-disable-next-line
  }, [closeFromParent]);

  const closeModal = () => {
    if (!isUnmounted.current) toggleShow(false);
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
      <>
        {
          // render the trigger element so it can be clicked
          triggers
        }
      </>

      {
        //transform translate y: 37%
        //transform translate x: 5%
        // classname of overlay takes hasRelativeParent into account by adjusting transform value to above. the reason this is necessary is because of the transform translates on the Action components, which resets the center for 'fixed', see more here:
        // https://developer.mozilla.org/en-US/docs/Web/CSS/position

        // This is the modal itself. It only shows if the trigger was clicked.
        show && (
          <>
            <div
              className={`h-screen w-screen fixed right-50 bottom-50 z-0 transform ${
                hasRelativeParent ? "translate-x-5% translate-y-37%" : "translate-x-1/2 translate-y-1/2"
              }`}
              onClick={closeModal}
            ></div>
            <div
              ref={(el) => setPopperElement(el)}
              style={isDetached ? detachedStyles : { ...styles.popper, ...relativeStyles }}
              {...attributes.popper}
              data-popper-placement="right"
              className={`resize bg-gray-100 p-3 shadow-xl rounded-md border-2 border-mb-green-200 max-w-screen-sm md:max-w-screen-md text-black max-h-70vh"
              }`}
            >
              {/* modal header with the "X" button for closing the modal */}
              <section className="py-1 px-2 flex justify-end text-gray-600">
                <button className="active:bg-mb-green-200 px-2 rounded-full" onClick={closeModal}>
                  Close
                </button>
              </section>
              {/* modal body that displays the children */}
              <section className="flex p-4 justify-center items-center flex-col">
                {title && <div className="font-semibold text-lg text-gray-700 mb-2">{title}</div>}
                <div className="my-2 max-w-full">
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
          </>
        )
      }
    </>
  );
};
