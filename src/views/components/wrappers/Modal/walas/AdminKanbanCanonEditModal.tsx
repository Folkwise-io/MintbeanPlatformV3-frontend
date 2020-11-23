import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { Button } from "../../../Button";
import { KanbanCanonEditForm } from "../../../forms/KanbanCanonEditForm";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  className?: string;
  buttonText: string;
  kanbanCanon: KanbanCanon;
  onEdit: () => void;
}

export const AdminKanbanCanonEditModal: FC<Props> = ({ className, buttonText, kanbanCanon, onEdit }) => {
  const context = useContext<Context>(MbContext);
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
    await context.kanbanCanonService.editKanbanCanon(kanbanCanon.id, params).then(() => {
      onEdit();
      closeModal();
    });
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
