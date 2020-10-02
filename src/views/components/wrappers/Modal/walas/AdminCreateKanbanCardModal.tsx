import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  //   data: KanbanCard;
}

export const AdminCreateKanbanCardModal: FC<Props> = () => {
  //   const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "secondary",
      text: "Close",
      buttonType: "button",
      onClick: (_evt, { closeModal }) => {
        closeModal();
      },
    },
  ];

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <button
            onClick={toggleModal}
            ref={(el) => setRef(el)}
            className="rounded-full text-white bg-mb-green-200 border-mb-green-200 border-solid border-2 h-12 w-12 flex justify-center items-center shadow-lg"
          >
            <>
              <span className="sr-only">Add kanban card</span>
              <FontAwesomeIcon className="text-2xl" icon={faPlus} />
            </>
          </button>
        )}
      >
        <p>This will be a form for adding kanban cards</p>
      </Modal>
    </>
  );
};
