import React, { FC, useState, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { ProjectCreateForm } from "../../../forms/ProjectCreateForm";
import { Button } from "../../../Button";

interface Props {
  buttonText: string;
  user: User;
  meetId: string;
  refetchMeet: () => Promise<boolean | void>;
}

const ProjectCreateModal: FC<ConnectContextProps & Props> = ({ context, buttonText, refetchMeet, meetId, user }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [triggerClose, setTriggerClose] = useState<number>(0);

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

  // very hacky. forces state update in child with random number
  const triggerModalClose = () => {
    setTriggerClose(Math.random());
  };

  const createProject = async (params: CreateProjectParams) => {
    if (context) {
      context.projectService
        .createProject(params)
        .then(() => refetchMeet())
        .then(() => triggerModalClose());
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
        closeFromParent={triggerClose}
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
