import React, { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Modal } from "../";
import { KanbanCardDetails } from "../../../Kanban/KanbanCardDetails";
import { KanbanCardSummary } from "../../../Kanban/KanbanCardSummary";
import { ModalActionContext, ModalActionDeclaration } from "../ModalActionButton";

interface Props {
  data: KanbanCanonCard;
  dndProvided: DraggableProvided;
  className?: string;
}

// Doubles for viewing and editing kanban cards
export const UserKanbanCardModal: FC<Props> = ({ data, dndProvided, className }) => {
  const actions: ModalActionDeclaration[] = [
    {
      type: "secondary",
      text: "Close",
      buttonType: "button",
      onClick: (_evt: React.SyntheticEvent, { closeModal }: ModalActionContext) => {
        closeModal();
      },
    },
  ];

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
        <KanbanCardDetails data={data} />
      </Modal>
    </>
  );
};
