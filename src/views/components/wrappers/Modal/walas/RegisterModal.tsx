import React, { FC } from "react";
import { Modal } from "../";
import RegisterForm from "../../../forms/RegisterForm";

interface Props {
  className?: string;
  buttonText: string;
}

export const RegisterModal: FC<Props> = ({ className, buttonText }) => {
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
