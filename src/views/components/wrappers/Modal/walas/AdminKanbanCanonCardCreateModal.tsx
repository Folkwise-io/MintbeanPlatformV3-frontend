import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KanbanCanonCardCreateForm } from "../../../forms/KanbanCanonCardCreateForm";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  kanbanCanonId: string;
  fetchKanbanCanon: () => void;
}
export const AdminKanbanCanonCardCreateModal: FC<Props> = ({ kanbanCanonId, fetchKanbanCanon }) => {
  const context = useContext<Context>(MbContext);
  const [close, triggerCloseModal] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Add",
      buttonType: "button",
      onClick: () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createKanbanCanonCard = async (input: CreateKanbanCanonCardInput) => {
    const newKanbanCard = await context.kanbanCanonService.createKanbanCanonCard(input);
    if (newKanbanCard) {
      fetchKanbanCanon();
      closeModal();
    }
  };

  const closeModal = () => {
    triggerCloseModal(Math.random());
  };

  return (
    <>
      <Modal
        actions={actions}
        isDetached
        triggerCloseFromParent={close}
        triggerBuilder={(toggleModal, setRef) => (
          <button
            onClick={toggleModal}
            ref={(el) => setRef(el)}
            className="rounded-full text-white bg-mb-green-200 border-mb-green-200 border-solid border-2 h-12 w-12 flex justify-center items-center shadow-lg"
          >
            <>
              <span className="sr-only">Button to add a kanban canon card</span>
              <FontAwesomeIcon className="text-2xl" icon={faPlus} />
            </>
          </button>
        )}
      >
        <KanbanCanonCardCreateForm
          formRef={formRef}
          createKanbanCanonCard={createKanbanCanonCard}
          kanbanCanonId={kanbanCanonId}
        />
      </Modal>
    </>
  );
};
