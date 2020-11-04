import React, { FC, useRef, useState } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KanbanCanonCardCreateForm } from "../../../forms/KanbanCanonCardCreateForm";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";

interface Props {
  kanbanCanonId: string;
  fetchKanbanCanon: () => Promise<void>;
}
const AdminKanbanCanonCardCreateModal: FC<ConnectContextProps & Props> = ({
  kanbanCanonId,
  context,
  fetchKanbanCanon,
}) => {
  const [close, setClose] = useState<(() => void) | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Add",
      buttonType: "button",
      onClick: (_evt, { closeModal }) => {
        if (formRef.current) {
          // hacky way of exposing closModal functionality externally
          setClose(closeModal);
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createKanbanCanonCard = async (input: CreateKanbanCanonCardInput) => {
    if (context) {
      context.kanbanCanonService.createKanbanCanonCard(input).then(() => {
        fetchKanbanCanon().then(() => {
          if (close) close();
        });
      });
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        isDetached
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
        <KanbanCanonCardCreateForm
          formRef={formRef}
          createKanbanCanonCard={createKanbanCanonCard}
          kanbanCanonId={kanbanCanonId}
        />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanCanonCardCreateModal);
