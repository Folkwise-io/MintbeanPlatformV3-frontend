import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { KanbanCanonCreateForm } from "../../../forms/KanbanCanonCreateForm";
import { Button } from "../../../Button";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  className?: string;
  buttonText: string;
  meetId?: string;
  onCreate: () => void;
}

export const AdminKanbanCanonCreateModal: FC<Props> = ({ onCreate, meetId, className, buttonText }) => {
  const context = useContext<Context>(MbContext);
  const [close, setClose] = useState<(() => void) | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Create Kanban Canon",
      buttonType: "submit",
      onClick: (_evt, { closeModal }) => {
        if (formRef.current) {
          // hacky way of exposing closeModal functionality externally
          setClose(closeModal);
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createKanbanCanon = async (input: CreateKanbanCanonInput) => {
    const confirmed = confirm(
      "Are you sure you want to create a kanban?\n\nOnce created, a kanban cannot be deleted or removed from a meet without contacting the dev team.\n\nPress OK to continue.",
    );

    if (confirmed) {
      await context.kanbanCanonService.createKanbanCanon(input).then(async (newKanbanCanon) => {
        if (newKanbanCanon) {
          // add new kanbanCanon to meet if meetId supplied
          if (meetId) {
            await context.meetService.editMeet(meetId, { kanbanCanonId: newKanbanCanon.id });
          }
          onCreate();
          if (close) close();
        }
      });
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        isDetached
        triggerBuilder={(toggleModal, setRef) => (
          <Button onClick={toggleModal} type="primaryAdmin" forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <KanbanCanonCreateForm formRef={formRef} createKanbanCanon={createKanbanCanon} />
      </Modal>
    </>
  );
};
