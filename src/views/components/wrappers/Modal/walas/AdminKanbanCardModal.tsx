import React, { FC, useRef, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Modal } from "../";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { KanbanCardEditForm } from "../../../forms/KanbanCardEditForm";
import { KanbanCardDetails } from "../../../Kanban/KanbanCardDetails";
import { KanbanCardSummary } from "../../../Kanban/KanbanCardSummary";
import { ModalActionContext, ModalActionDeclaration } from "../ModalActionButton";

interface Props {
  data: KanbanCard;
  fetchKanban: () => Promise<void>;
  dndProvided: DraggableProvided;
  className?: string;
}

// Doubles for viewing and editing kanban cards
const AdminKanbanCardModal: FC<ConnectContextProps & Props> = ({
  data,
  context,
  fetchKanban,
  dndProvided,
  className,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [mode, setMode] = useState<"edit" | "view">("view");

  const viewActionButtons: ModalActionDeclaration[] = [
    {
      type: "secondary",
      text: "Close",
      buttonType: "button",
      onClick: (_evt: React.SyntheticEvent, { closeModal }: ModalActionContext) => {
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
  ];
  const editActionButtons: ModalActionDeclaration[] = [
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
  const actions: ModalActionDeclaration[] = [
    {
      type: "danger",
      text: "Delete",
      buttonType: "button",
      onClick: (_evt: React.SyntheticEvent, { closeModal }: ModalActionContext) => {
        const confirmed = confirm("Are you sure you want to delete this kanban card?");
        if (confirmed) {
          deleteKanbanCard()
            .then(() => fetchKanban())
            .then(() => closeModal());
        }
      },
    },
  ];
  // Updates modal action buttons depending on the mode.
  // Typescript not permitting conditional concat of arrays so merging it this way:
  mode === "view"
    ? viewActionButtons.forEach((ab) => actions.push(ab))
    : editActionButtons.forEach((ab) => actions.push(ab));

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
  const deleteKanbanCard = async () => {
    if (context) {
      await context.kanbanService.deleteKanbanCard(data.id).then(() => {
        fetchKanban();
      });
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };

  /* Using accessible <div> of role button instead of actual <button> for trigger due to a problem with button not complying with drag and drop refs */
  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <div ref={dndProvided.innerRef} {...dndProvided.draggableProps} {...dndProvided.dragHandleProps}>
            <div onClick={toggleModal} role="button" tabIndex={0} className="w-full" ref={(el) => setRef(el)}>
              <KanbanCardSummary data={data} className={className ? className : ""} />
            </div>
          </div>
        )}
      >
        {mode === "view" ? (
          <KanbanCardDetails data={data} />
        ) : (
          <KanbanCardEditForm formRef={formRef} editKanbanCard={editKanbanCard} data={data} />
        )}
      </Modal>
    </>
  );
};
export default connectContext<ConnectContextProps & Props>(AdminKanbanCardModal);
