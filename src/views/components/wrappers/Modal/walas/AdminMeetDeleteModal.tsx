// <Modal
//   actions={actions}
//   triggerBuilder={(toggleModal, setRef) => (
//     <button onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
//       {buttonText}
//     </button>
//   )}
// >
//   <p>Are you sure you want to delete the event "{title}"?</p>
// </Modal>

import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { MeetCreateForm } from "../../../forms/MeetCreateForm";
import { useHistory } from "react-router-dom";
import { Button } from "../../../Button";

interface Props {
  className?: string;
  buttonText: string;
  meet: Meet;
}

const AdminMeetDeleteModal: FC<ConnectContextProps & Props> = ({ context, meet, className, buttonText }) => {
  const actions: ModalActionDeclaration[] = [
    {
      type: "danger",
      text: "Delete",
      onClick: (_evt, { closeModal }) => {
        deleteMeet(meet.id);
        closeModal();
      },
    },
    {
      type: "secondary",
      text: "Cancel",
      onClick: (_evt, { closeModal }) => {
        closeModal();
      },
    },
  ];

  const deleteMeet = (id: string) => {
    if (context) {
      context.meetService.deleteMeet(id);
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button type="danger" onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <p>
          Are you sure you want to delete meet {'"'}
          {meet.title}
          {'"'}?
        </p>
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminMeetDeleteModal);
