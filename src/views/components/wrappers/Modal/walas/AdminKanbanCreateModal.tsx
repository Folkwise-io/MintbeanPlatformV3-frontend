import React, { FC, useRef, useState } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { KanbanCreateForm } from "../../../forms/KanbanCreateForm";
import { Button } from "../../../Button";

interface Props {
  className?: string;
  buttonText: string;
  meetId?: string;
  onCreate: () => void;
}

const AdminKanbanCreateModal: FC<ConnectContextProps & Props> = ({
  onCreate,
  meetId,
  context,
  className,
  buttonText,
}) => {
  const [close, setClose] = useState<(() => void) | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Create Kanban",
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

  const createKanban = async (input: CreateKanbanInput) => {
    if (context) {
      await context.kanbanService.createKanban(input).then(async (newKanban) => {
        if (newKanban) {
          // add new kanban to meet if meetId supplied
          if (meetId) {
            await context.meetService.editMeet(meetId, { kanbanId: newKanban.id });
          }
          onCreate();
          if (close) close();
        }
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
          <Button onClick={toggleModal} type="primaryAdmin" forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <KanbanCreateForm formRef={formRef} createKanban={createKanban} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanCreateModal);
