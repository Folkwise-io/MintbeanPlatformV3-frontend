import React, { FC, useContext } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { Button } from "../../../Button";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  className?: string;
  buttonText: string;
  meet: Meet;
  onDelete: () => Promise<boolean | void>;
}

export const AdminMeetDeleteModal: FC<Props> = ({ meet, className, buttonText, onDelete }) => {
  const context = useContext<Context>(MbContext);
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
    context.meetService.deleteMeet(id);
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
