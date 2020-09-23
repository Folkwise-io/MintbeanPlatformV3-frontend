import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { ProjectCreateForm } from "../../../forms/ProjectCreateForm";
import { Button } from "../../../Button";
import { useHistory } from "react-router-dom";

interface Props {
  buttonText: string;
  user: User;
  meetId: string;
}

const ProjectCreateModal: FC<ConnectContextProps & Props> = ({ context, buttonText, meetId, user }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Submit project",
      buttonType: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createProject = async (params: CreateProjectParams) => {
    let projectId: string;
    if (context) {
      await context.projectService
        .createProject(params)
        .then((proj) => {
          console.log({ proj });
          if (proj) {
            projectId = proj.id;
          }
        })
        .then(() => history.push(`/projects/${projectId}`));
    } else {
      alert("Yikes, devs messed up sorry. Action did not work");
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

export default connectContext<ConnectContextProps & Props>(ProjectCreateModal);
