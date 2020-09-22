import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { ProjectCreateForm } from "../../../forms/ProjectCreateForm";
import { Button } from "../../../Button";

interface Props {
  className?: string;
  buttonText: string;
  userId: string;
  meetId: string;
  refetchMeet: () => Promise<boolean | void>;
}

const ProjectCreateModal: FC<ConnectContextProps & Props> = ({
  context,
  className,
  buttonText,
  refetchMeet,
  meetId,
  userId,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Submit a project",
      buttonType: "submit",
      onClick: async () => {
        console.log(formRef.current);
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createProject = async (params: CreateProjectParams) => {
    if (context) {
      context.projectService.createProject(params).then(() => refetchMeet());
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
          userId={userId}
          meetId={meetId}
          className="text-black font-regular"
        />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(ProjectCreateModal);
