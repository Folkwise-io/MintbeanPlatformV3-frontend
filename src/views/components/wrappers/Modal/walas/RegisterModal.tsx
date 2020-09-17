import React, { FC, useRef } from "react";
import { Modal } from "../";
import RegisterForm from "../../../forms/RegisterForm";
import { ModalActionDeclaration } from "../ModalActionButton";
import { register } from "../../../../state/actions/authActions";

interface Props {
  className?: string;
  buttonText: string;
}

export const RegisterModal: FC<Props> = ({ className, buttonText }) => {
  // form methods for react hooks form provider
  const formRef = useRef<HTMLFormElement>();

  const actions: ModalActionDeclaration[] = [
    {
      type: "primary",
      text: "Sign Up",
      onClick: async (evt, { closeModal }) => {
        try {
          // if (isValid) {
          //   await formMethods.handleSubmit(onSubmit)();
          //   closeModal();
          // }

          formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
          console.log("modal action button clicked ");
          console.log(formRef.current);
        } catch (e) {
          console.log(e);
          alert("badddd");
        }
      },
    },
  ];

  const onSubmit = async (data: RegisterParams) => await register(data);

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
        <RegisterForm ref={formRef} />
      </Modal>
    </>
  );
};

// <RegisterForm refs={formRef} />
