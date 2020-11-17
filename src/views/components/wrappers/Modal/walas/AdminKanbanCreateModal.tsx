import React, { FC, useRef } from "react";
import { Modal } from "..";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { KanbanCreateForm } from "../../../forms/KanbanCreateForm";
import { Button } from "../../../blocks/Button";

interface Props {
  className?: string;
  buttonText: string;
  meetId?: string;
  // TODO: remove this. for demo purpose only
  setKanban: (kanban: Kanban) => void;
}

const AdminKanbanCreateModal: FC<ConnectContextProps & Props> = ({
  setKanban,
  meetId,
  context,
  className,
  buttonText,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  // const history = useHistory();

  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Create Kanban",
      type: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createKanban = async (input: CreateKanbanInput) => {
    if (context) {
      context.kanbanService.createKanban(input).then((newKanban) => {
        // TODO: determine actual post-success behavior
        if (newKanban) {
          setKanban(newKanban);
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
        <KanbanCreateForm formRef={formRef} createKanban={createKanban} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminKanbanCreateModal);
