import React, { FC } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";

interface Props {
  className?: string;
  buttonText: string;
  kanbanCanon: KanbanCanon;
  onDelete?: () => void;
}

const AdminKanbanCanonDeleteModal: FC<ConnectContextProps & Props> = ({
  context,
  kanbanCanon,
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
        await deleteKanbanCanon(kanbanCanon.id);
        if (onDelete) onDelete();
        closeModal();
      },
    },
  ];

  const deleteKanbanCanon = async (id: string) => {
    if (context) {
      await context.kanbanCanonService.deleteKanbanCanon(id);
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
          <p>
            <span className="text-red-500 font-semibold">Warning!</span> Deleting this kanban canon will delete the
            progress of any users already using this kanban canon.
          </p>
          <br />
          <p>
            Are you sure you want to delete kanban canon{" "}
            <strong>
              {'"'}
              {kanbanCanon.title}
            </strong>
            {'"'}?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanCanonDeleteModal);
