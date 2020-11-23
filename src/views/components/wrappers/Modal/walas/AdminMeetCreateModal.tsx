import React, { FC, useContext, useRef } from "react";
import { Modal } from "../";
import { ModalActionDeclaration } from "../ModalActionButton";
import { MeetCreateForm } from "../../../forms/MeetCreateForm";
import { useHistory } from "react-router-dom";
import { MbContext } from "../../../../../context/MbContext";
import { Context } from "../../../../../context/contextBuilder";

interface Props {
  className?: string;
  buttonText: string;
  refetchMeets: () => Promise<boolean | void>;
}

export const AdminMeetCreateModal: FC<Props> = ({ className, buttonText, refetchMeets }) => {
  const context = useContext<Context>(MbContext);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Create Meet",
      buttonType: "submit",
      onClick: async () => {
        if (formRef.current) {
          // Programatically submit form in grandchild
          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      },
    },
  ];

  const createMeet = async (params: CreateMeetInput) => {
    let meetId: string;
    context.meetService
      .createMeet(params)
      .then((newMeet) => {
        if (newMeet) {
          meetId = newMeet.id;
        }
      })
      .then(() => history.push(`/meets/${meetId}`));
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
