import React, { FC, useContext } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { Context } from "../../../../../context/contextBuilder";
import { MbContext } from "../../../../../context/MbContext";
import { Button } from "../../../blocks/Button";

interface Props {
  className?: string;
  buttonText: string;
  project: Project;
  onDelete: () => Promise<boolean | void>;
  isAdmin: boolean | undefined;
}

export const ProjectDeleteModal: FC<Props> = ({ project, className, buttonText, onDelete, isAdmin }) => {
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
      onClick: (_evt, { closeModal }) => {
        deleteProject(project.id)
          .then(() => onDelete())
          .then(() => closeModal());
      },
    },
  ];

  const deleteProject = async (id: string) => {
    context.projectService.deleteProject(id);
  };

  const renderDeleteConfirmation = () =>
    isAdmin ? (
      <p className="text-black">
        Are you sure you want to delete {project.user.firstName}&apos;s project {'"'}
        {project.title}
        {'"'}?
      </p>
    ) : (
      <p className="text-black">
        Are you sure you want to delete your project {'"'}
        {project.title}
        {'"'}?
      </p>
    );

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
        {renderDeleteConfirmation()}
      </Modal>
    </>
  );
};
