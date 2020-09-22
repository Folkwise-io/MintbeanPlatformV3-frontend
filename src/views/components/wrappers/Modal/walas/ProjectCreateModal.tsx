import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { ProjectCreateForm } from "../../../forms/ProjectCreateForm";

interface Props {
  className?: string;
  buttonText: string;
  userId: string;
  meetId: string;
  refetchMeet: () => Promise<boolean | void>;
}

const AdminProjectCreateModal: FC<ConnectContextProps & Props> = ({
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
          <button onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </button>
        )}
      >
        <ProjectCreateForm formRef={formRef} createProject={createProject} userId={userId} meetId={meetId} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminMeetCreateModal);
