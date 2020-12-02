import React, { FC, useContext, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { ProjectCreateForm } from "../../../forms/ProjectCreateForm";
import { Button } from "../../../blocks/Button";
import { useHistory } from "react-router-dom";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  buttonText: string;
  user: User;
  meetId: string;
}

export const ProjectCreateModal: FC<Props> = ({ buttonText, meetId, user }) => {
  const context = useContext<Context>(MbContext);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Submit project",
      type: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createProject = async (input: CreateProjectInput) => {
    const project = await context.projectService.createProject(input);
    if (project) {
      history.push(`/projects/${project.id}`);
    }
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerBuilder={(toggleModal, setRef) => (
          <Button onClick={toggleModal} forwardRef={(el) => setRef(el)}>
            {buttonText}
          </Button>
        )}
      >
        <ProjectCreateForm
          formRef={formRef}
          createProject={createProject}
          user={user}
          meetId={meetId}
          className="text-black font-regular"
        />
      </Modal>
    </>
  );
};
