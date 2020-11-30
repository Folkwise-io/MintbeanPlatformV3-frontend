import React, { FC, useContext, useRef, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Modal } from "..";
import { Context } from "../../../../../context/contextBuilder";
import { MbContext } from "../../../../../context/MbContext";
import { KanbanCanonCardEditForm } from "../../../forms/KanbanCanonCardEditForm";
import { KanbanCardDetails } from "../../../Kanban/KanbanCardDetails";
import { KanbanCardSummary } from "../../../Kanban/KanbanCardSummary";
import { ModalActionContext, ModalActionDeclaration } from "../ModalActionButton";

interface Props {
  data: KanbanCanonCard;
  fetchKanbanCanon: () => Promise<void>;
  dndProvided: DraggableProvided;
  className?: string;
}

// Doubles for viewing and editing kanbanCanon cards
export const AdminKanbanCanonCardModal: FC<Props> = ({ data, fetchKanbanCanon, dndProvided, className }) => {
  const context = useContext<Context>(MbContext);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [mode, setMode] = useState<"edit" | "view">("view");
  const viewActionButtons: ModalActionDeclaration[] = [
    {
      buttonStyle: "secondary",
      text: "Close",
      type: "button",
      onClick: (_evt: React.SyntheticEvent, { closeModal }: ModalActionContext) => {
        closeModal();
      },
    },
    {
      buttonStyle: "primary",
      text: "Edit",
      type: "button",
      onClick: () => {
        setMode("edit");
      },
    },
  ];
  const editActionButtons: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Save",
      type: "button",
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
      buttonStyle: "danger",
      text: "Delete",
      type: "button",
      onClick: (_evt: React.SyntheticEvent, { closeModal }: ModalActionContext) => {
        const confirmed = confirm("Are you sure you want to delete this kanban canon card?");
        if (confirmed) {
          deleteKanbanCanonCard()
            .then(() => fetchKanbanCanon())
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

  const editKanbanCanonCard = async (input: EditKanbanCanonCardInput) => {
    await context.kanbanCanonService.editKanbanCanonCard(data.id, input);
    await fetchKanbanCanon();
    setMode("view");
  };
  const deleteKanbanCanonCard = async () => {
    await context.kanbanCanonService.deleteKanbanCanonCard(data.id);
    fetchKanbanCanon();
  };

  /* Using accessible <div> of role button instead of actual <button> for trigger due to a problem with button not complying with drag and drop refs */
  return (
    <>
      <Modal
        actions={actions}
        isDetached
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
          <KanbanCanonCardEditForm formRef={formRef} editKanbanCanonCard={editKanbanCanonCard} data={data} />
        )}
      </Modal>
    </>
  );
};
