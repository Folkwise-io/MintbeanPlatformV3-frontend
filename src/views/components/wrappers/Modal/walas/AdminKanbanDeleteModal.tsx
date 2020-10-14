import React, { FC } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";

interface Props {
  className?: string;
  buttonText: string;
  kanban: Kanban;
  onDelete?: () => void;
}

const AdminKanbanDeleteModal: FC<ConnectContextProps & Props> = ({
  context,
  kanban,
  className,
  buttonText,
  onDelete,
}) => {
  const actions: ModalActionDeclaration[] = [
    {
      type: "secondary",
      text: "Cancel",
      onClick: (_evt, { closeModal }) => {
        closeModal();
      },
    },
    {
      type: "danger",
      text: "Delete",
      onClick: async (_evt, { closeModal }) => {
        await deleteKanban(kanban.id);
        if (onDelete) onDelete();
        closeModal();
      },
    },
  ];

  const deleteKanban = async (id: string) => {
    if (context) {
      await context.kanbanService.deleteKanban(id);
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
          <Button type="danger" onClick={toggleModal} forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        {" "}
        <div className="text-black">
          <p>Warning! Deleting this kanban will delete the progress of any users already using this kanban.</p>
          <br />
          <p>
            Are you sure you want to delete kanban{" "}
            <strong>
              {'"'}
              {kanban.title}
            </strong>
            {'"'}?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanDeleteModal);
