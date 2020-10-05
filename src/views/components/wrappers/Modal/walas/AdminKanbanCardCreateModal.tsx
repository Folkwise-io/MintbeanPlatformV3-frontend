import React, { FC, useRef } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KanbanCardCreateForm } from "../../../forms/KanbanCardCreateForm";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";

interface Props {
  kanbanId: string;
  // TODO: remove kanban and setKanban. For demonstration purpose only.
  kanban: Kanban;
  setKanban: React.Dispatch<React.SetStateAction<Kanban | null>>;
}
const AdminKanbanCardCreateModal: FC<ConnectContextProps & Props> = ({ kanbanId, kanban, context, setKanban }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Add",
      buttonType: "button",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createKanbanCard = async (input: CreateKanbanCardInput) => {
    if (context) {
      context.kanbanService.createKanbanCard(input).then((newKanbanCard) => {
        // TODO: determine actual post-success behavior
        console.log({ kanban });
        if (newKanbanCard) {
          const kbcards = kanban.kanbanCards.map((kbc) => kbc);
          console.log({ kbcards });
          kbcards.push(newKanbanCard);
          const updatedKanban = { ...kanban, kanbanCards: kbcards };
          console.log({ updatedKanban });
          setKanban(updatedKanban);
        }
      });
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };

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
        <KanbanCardCreateForm formRef={formRef} createKanbanCard={createKanbanCard} kanbanId={kanbanId} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanCardCreateModal);
