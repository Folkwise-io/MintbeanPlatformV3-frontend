import React, { FC, useRef, useState } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";
import { KanbanCanonEditForm } from "../../../forms/KanbanCanonEditForm";

interface Props {
  className?: string;
  buttonText: string;
  kanbanCanon: KanbanCanon;
  onEdit: () => void;
}

const AdminKanbanCanonEditModal: FC<ConnectContextProps & Props> = ({
  context,
  className,
  buttonText,
  kanbanCanon,
  onEdit,
}) => {
  const [close, triggerCloseFromParent] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Save",
      buttonType: "submit",
      onClick: () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const editKanbanCanon = async (params: EditKanbanCanonInput) => {
    if (context) {
      await context.kanbanCanonService.editKanbanCanon(kanbanCanon.id, params).then(() => {
        onEdit();
        closeModal();
      });
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };

  const closeModal = (): void => {
    triggerCloseFromParent(Math.random());
  };

  return (
    <>
      <Modal
        actions={actions}
        isDetached
        triggerCloseFromParent={close}
        triggerBuilder={(toggleModal, setRef) => (
          <Button type="secondary" onClick={toggleModal} forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <KanbanCanonEditForm formRef={formRef} editKanbanCanon={editKanbanCanon} kanbanCanon={kanbanCanon} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanCanonEditModal);
