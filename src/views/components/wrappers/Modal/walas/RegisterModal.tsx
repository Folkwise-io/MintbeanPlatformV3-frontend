import React, { FC } from "react";
import { Modal } from "../";
import RegisterForm from "../../../forms/RegisterForm";

interface Props {
  className?: string;
  buttonText: string;
}

export const RegisterModal: FC<Props> = ({ className, buttonText }) => {
  /* TODO: use modal actino button for form submit */
  /* Need to find a way to decouple form submit from formik*/
  // const actions: ModalActionDeclaration[] = [
  //   {
  //     type: "primary",
  //     text: "Sign Up",
  //     onClick: (evt, { closeModal }) => closeModal(),
  //   },
  // ];
  return (
    <>
      <Modal
        triggerBuilder={(toggleModal, setRef) => (
          <button onClick={toggleModal} ref={(el) => setRef(el)} className={className || ""}>
            {buttonText}
          </button>
        )}
      >
        <RegisterForm />
      </Modal>
    </>
  );
};
