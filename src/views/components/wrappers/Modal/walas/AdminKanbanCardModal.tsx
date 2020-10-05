import React, { FC } from "react";
import { Modal } from "../";
import { KanbanCardDetailsAdmin } from "../../../Kanban/KanbanCardDetailsAdmin";
import { KanbanCardSummaryAdmin } from "../../../Kanban/KanbanCardSummaryAdmin";
import { ModalActionDeclaration } from "../ModalActionButton";

interface Props {
  data: KanbanCard;
}

export const AdminKanbanCardModal: FC<Props> = ({ data }) => {
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
  /* Using accessible <div> instead of <button> for trigger due to a problem with button not complying with drag and drop refs */
  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <div onClick={toggleModal} role="button" tabIndex={0} ref={(el) => setRef(el)} className="w-full">
            <KanbanCardSummaryAdmin data={data} />
          </div>
        )}
      >
        <KanbanCardDetailsAdmin data={data} />
      </Modal>
    </>
  );
};
