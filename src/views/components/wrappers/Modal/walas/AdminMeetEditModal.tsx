import React, { FC, useContext, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { MeetEditForm } from "../../../forms/MeetEditForm";
import { Button } from "../../../Button";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

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
      type: "primary",
      text: "Update meet",
      buttonType: "submit",
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
      // can't get react router history to push reload same page for some reason
      window && window.location.reload();
    });
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button type="secondary" onClick={toggleModal} forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <MeetEditForm formRef={formRef} editMeet={editMeet} meet={meet} />
      </Modal>
    </>
  );
};
