import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { KanbanCanonCreateForm } from "../../../forms/KanbanCanonCreateForm";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";
import { Button } from "../../../blocks/Button";

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
      buttonStyle: "primary",
      text: "Create Kanban Canon",
      type: "submit",
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
      const newKanbanCanon = await context.kanbanCanonService.createKanbanCanon(input);
      if (newKanbanCanon) {
        if (meetId) {
          // add new kanbanCanon to meet if meetId supplied
          await context.meetService.editMeet(meetId, { kanbanCanonId: newKanbanCanon.id });
        }
        onCreate();
        if (close) close();
      }
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        isDetached
        triggerBuilder={(toggleModal, setRef) => (
          <Button
            onClick={toggleModal}
            buttonStyle="primaryAdmin"
            forwardRef={(el) => setRef(el)}
            className={className || ""}
          >
            {buttonText}
          </Button>
        )}
      >
        <KanbanCanonCreateForm formRef={formRef} createKanbanCanon={createKanbanCanon} />
      </Modal>
    </>
  );
};
