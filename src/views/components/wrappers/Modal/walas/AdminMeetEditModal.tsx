import React, { FC, useContext, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { MeetEditForm } from "../../../forms/MeetEditForm";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";
import { Button } from "../../../blocks/Button";

interface Props {
  className?: string;
  buttonText: string;
  meet: Meet;
}

export const AdminMeetEditModal: FC<Props> = ({ className, buttonText, meet }) => {
  const context = useContext<Context>(MbContext);
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Update meet",
      type: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const editMeet = async (params: EditMeetInput) => {
    await context.meetService.editMeet(meet.id, params).then(() => {
      // force page reload
      window && window.location.reload();
    });
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button
            buttonStyle="secondary"
            onClick={toggleModal}
            forwardRef={(el) => setRef(el)}
            className={className || ""}
          >
            {buttonText}
          </Button>
        )}
      >
        <MeetEditForm formRef={formRef} editMeet={editMeet} meet={meet} />
      </Modal>
    </>
  );
};
