import React, { FC } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";
import { Badge } from "../../../../../types/badge";

interface Props {
  className?: string;
  buttonText: string;
  badge: Badge;
  onDelete: () => Promise<boolean | void>;
}

const AdminBadgeDeleteModal: FC<ConnectContextProps & Props> = ({
  context,
  badge,
  className,
  buttonText,
  onDelete,
}) => {
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
      onClick: async (_evt, { closeModal }) => {
        await deleteMeet(badge.id);
        await onDelete();
        closeModal();
      },
    },
  ];

  const deleteMeet = async (id: string) => {
    if (context) {
      context.badgeService.deleteBadge(id);
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
          Are you sure you want to delete badge {'"'}
          {badge.alias}
          {'"'}?
        </p>
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminBadgeDeleteModal);
