import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { useHistory } from "react-router-dom";
import { MeetEditForm } from "../../../forms/MeetEditForm";

interface Props {
  className?: string;
  buttonText: string;
  meet: Meet;
}

const AdminMeetEditModal: FC<ConnectContextProps & Props> = ({ context, className, buttonText, meet }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const actions: ModalActionDeclaration[] = [
    {
      type: "secondary",
      text: "Edit",
      buttonType: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const editMeet = async (params: CreateMeetParams) => {
    if (context) {
      context.meetService.editMeet(meet.id, params).then(() => history.push(`/meets/${meet.id}`));
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <button onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </button>
        )}
      >
        <MeetEditForm formRef={formRef} editMeet={editMeet} meet={meet} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminMeetEditModal);
