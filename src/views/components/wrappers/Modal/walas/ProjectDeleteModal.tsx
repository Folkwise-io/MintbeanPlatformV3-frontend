import React, { FC } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { Button } from "../../../Button";
import { Project } from "../../../../../../types";

interface Props {
  className?: string;
  buttonText: string;
  project: Project;
  onDelete: () => Promise<boolean | void>;
  isAdmin: boolean | undefined;
}

const ProjectDeleteModal: FC<ConnectContextProps & Props> = ({
  context,
  project,
  className,
  buttonText,
  onDelete,
  isAdmin,
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
      onClick: (_evt, { closeModal }) => {
        deleteProject(project.id)
          .then(() => onDelete())
          .then(() => closeModal());
      },
    },
  ];

  const deleteProject = async (id: string) => {
    if (context) {
      context.projectService.deleteProject(id);
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
        {" "}
        {isAdmin ? (
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
        )}
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(ProjectDeleteModal);
