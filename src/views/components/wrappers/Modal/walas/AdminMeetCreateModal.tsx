import React, { FC, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { connectContext, ConnectContextProps } from "../../../../../context/connectContext";
import { MeetCreateForm } from "../../../forms/MeetCreateForm";

interface Props {
  className?: string;
  buttonText: string;
  refetchMeets: () => Promise<boolean | void>;
}

const AdminMeetCreateModal: FC<ConnectContextProps & Props> = ({ context, className, buttonText, refetchMeets }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Create Meet",
      buttonType: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchMeet(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createMeet = async (params: CreateMeetParams) => {
    if (context) {
      context.meetService.createMeet(params).then(() => refetchMeets());
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
        <MeetCreateForm formRef={formRef} createMeet={createMeet} />
      </Modal>
    </>
  );
};

export default connectContext<ConnectContextProps & Props>(AdminMeetCreateModal);
