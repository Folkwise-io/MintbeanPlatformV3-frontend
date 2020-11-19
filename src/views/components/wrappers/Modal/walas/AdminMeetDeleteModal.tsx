import React, { FC } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";
import { Meet } from "../../../../../../types";

interface Props {
  className?: string;
  buttonText: string;
  meet: Meet;
  onDelete: () => Promise<boolean | void>;
}

const AdminMeetDeleteModal: FC<ConnectContextProps & Props> = ({ context, meet, className, buttonText, onDelete }) => {
  const actions: ModalActionDeclaration[] = [
    {
      type: "secondary",
      text: "Cancel",
      onClick: (_evt, { closeModal }) => {
        closeModal();
      },
    },
    {
      type: "danger",
      text: "Delete",
      onClick: (_evt, { closeModal }) => {
        deleteMeet(meet.id)
          .then(() => onDelete())
          .then(() => closeModal());
      },
    },
  ];

  const deleteMeet = async (id: string) => {
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
          <Button type="danger" onClick={toggleModal} forwardRef={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </Button>
        )}
      >
        <p className="text-black">
          Are you sure you want to delete meet {'"'}
          {meet.title}
          {'"'}?
        </p>
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminMeetDeleteModal);
