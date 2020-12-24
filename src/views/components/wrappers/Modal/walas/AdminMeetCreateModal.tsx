import React, { FC, useContext, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { MeetCreateForm } from "../../../forms/MeetCreateForm";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";
import { useHistory } from "react-router-dom";
import { CreateMeetInput } from "../../../../../types/meet";
import { Button } from "../../../blocks/Button";

interface Props {
  className?: string;
  buttonText: string;
}

export const AdminMeetCreateModal: FC<Props> = ({ className, buttonText }) => {
  const context = useContext<Context>(MbContext);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Create Meet",
      type: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createMeet = async (input: CreateMeetInput) => {
    const newMeet = await context.meetService.createMeet(input);
    if (newMeet) {
      history.push(`/meets/${newMeet.id}`);
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button
            buttonStyle="primaryAdmin"
            onClick={toggleModal}
            forwardRef={(el) => setRef(el)}
            className={className || ""}
          >
            {buttonText}
          </Button>
        )}
      >
        <MeetCreateForm formRef={formRef} createMeet={createMeet} />
      </Modal>
    </>
  );
};
