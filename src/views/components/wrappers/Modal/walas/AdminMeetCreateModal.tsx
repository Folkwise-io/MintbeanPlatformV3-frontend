import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { MeetCreateForm } from "../../../forms/MeetCreateForm";
// import { useHistory } from "react-router-dom";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  className?: string;
  buttonText: string;
  onCreate: () => Promise<boolean | void>;
}

export const AdminMeetCreateModal: FC<Props> = ({ className, buttonText, onCreate }) => {
  const context = useContext<Context>(MbContext);
  const [close, triggerCloseModal] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const actions: ModalActionDeclaration[] = [
    {
      buttonStyle: "primary",
      text: "Create Meet",
      type: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const closeModal = () => {
    triggerCloseModal(Math.random());
  };

  const createMeet = async (params: CreateMeetInput) => {
    context.meetService
      .createMeet(params)
      .then(() => onCreate())
      .then(() => closeModal());
  };

  return (
    <>
      <Modal
        actions={actions}
        triggerCloseFromParent={close}
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
