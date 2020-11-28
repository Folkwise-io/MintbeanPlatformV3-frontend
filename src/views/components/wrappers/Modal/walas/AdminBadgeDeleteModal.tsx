import React, { FC, useContext } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { Badge } from "../../../../../types/badge";
import { MbContext } from "../../../../../context/MbContext";
import { Button } from "../../../blocks/Button";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  className?: string;
  buttonText: string;
  badge: Badge;
  onDelete: () => Promise<boolean | void>;
}

export const AdminBadgeDeleteModal: FC<Props> = ({ badge, className, buttonText, onDelete }) => {
  const context = useContext<Context>(MbContext);
  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "secondary",
      text: "Cancel",
      onClick: (_evt, { closeModal }) => {
        closeModal();
      },
    },
    {
      buttonStyle: "danger",
      text: "Delete",
      onClick: async (_evt, { closeModal }) => {
        await deleteBadge(badge.id);
        await onDelete();
        closeModal();
      },
    },
  ];

  const deleteBadge = async (id: string) => {
    await context.badgeService.deleteBadge(id);
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button
            buttonStyle="danger"
            onClick={toggleModal}
            forwardRef={(el) => setRef(el)}
            className={className || ""}
          >
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
