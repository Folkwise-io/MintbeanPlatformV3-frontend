import React, { FC, useRef, useState } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";
import { KanbanEditForm } from "../../../forms/KanbanEditForm";

interface Props {
  className?: string;
  buttonText: string;
  kanban: Kanban;
  onEdit: () => void;
}

const AdminKanbanEditModal: FC<ConnectContextProps & Props> = ({ context, className, buttonText, kanban, onEdit }) => {
  const [close, setClose] = useState<(() => void) | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Save",
      buttonType: "submit",
      onClick: (_evt, { closeModal }) => {
        if (formRef.current) {
          // hacky trick for exposing closeModal functionally externally
          setClose(closeModal);
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const editKanban = async (params: EditKanbanInput) => {
    if (context) {
      await context.kanbanService.editKanban(kanban.id, params).then(() => {
        onEdit();
        if (close) close();
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
          <Button type="secondary" onClick={toggleModal} forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <KanbanEditForm formRef={formRef} editKanban={editKanban} kanban={kanban} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanEditModal);
