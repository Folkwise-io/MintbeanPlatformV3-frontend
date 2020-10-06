import React, { FC, useRef, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Modal } from "../";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { KanbanCardEditForm } from "../../../forms/KanbanCardEditForm";
import { KanbanCardDetailsAdmin } from "../../../Kanban/KanbanCardDetailsAdmin";
import { KanbanCardSummaryAdmin } from "../../../Kanban/KanbanCardSummaryAdmin";
import { ModalActionDeclaration } from "../ModalActionButton";

interface Props {
  data: KanbanCard;
  fetchKanban: () => Promise<void>;
  dndProvided: DraggableProvided;
}

// Doubles for viewing and editing kanban cards
const AdminKanbanCardModal: FC<ConnectContextProps & Props> = ({ data, context, fetchKanban, dndProvided }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [mode, setMode] = useState<"edit" | "view">("view");

  const actions: ModalActionDeclaration[] =
    mode === "view"
      ? [
          {
            type: "secondary",
            text: "Close",
            buttonType: "button",
            onClick: (_evt, { closeModal }) => {
              closeModal();
            },
          },
          {
            type: "primary",
            text: "Edit",
            buttonType: "button",
            onClick: () => {
              setMode("edit");
            },
          },
        ]
      : [
          {
            type: "primary",
            text: "Save",
            buttonType: "button",
            onClick: async () => {
              if (formRef.current) {
                // Programatically submit form in grandchild
                formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
              }
            },
          },
        ];

  const editKanbanCard = async (input: EditKanbanCardInput) => {
    if (context) {
      await context.kanbanService
        .editKanbanCard(data.id, input)
        .then(() => {
          fetchKanban();
        })
        .finally(() => setMode("view"));
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };
  /* Using accessible <div> instead of <button> for trigger due to a problem with button not complying with drag and drop refs */
  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <div ref={dndProvided.innerRef} {...dndProvided.draggableProps} {...dndProvided.dragHandleProps}>
            <div onClick={toggleModal} role="button" tabIndex={0} className="w-full" ref={(el) => setRef(el)}>
              <KanbanCardSummaryAdmin data={data} />
            </div>
          </div>
        )}
      >
        {mode === "view" ? (
          <KanbanCardDetailsAdmin data={data} />
        ) : (
          <KanbanCardEditForm formRef={formRef} editKanbanCard={editKanbanCard} data={data} />
        )}
      </Modal>
    </>
  );
};
export default connectContext<ConnectContextProps & Props>(AdminKanbanCardModal);
