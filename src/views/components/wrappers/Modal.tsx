import React, { FC, ReactElement, useState } from "react";
import "./styles/modal.css";

interface ModalProps {
  size?: "l" | "m";
  onSubmitHandler?: () => void;
  triggerBuilder: (trigger: React.Dispatch<React.SetStateAction<boolean>>) => ReactElement;
}

export const Modal: FC<ModalProps> = ({ children, size = "m", onSubmitHandler, triggerBuilder }): ReactElement => {
  const [open, toggleOpen] = useState(false);
  const submit = () => {
    if (onSubmitHandler) {
      onSubmitHandler();
    }
    toggleOpen(false);
  };

  return (
    <div style={{ width: "fit-content", height: "fit-content" }} className="w-full h-full relative">
      {open && (
        <section className={`absolute w-${size}`}>
          <section className="w-full flex justify-end items-center">
            <button onClick={() => toggleOpen(!open)}>X</button>
          </section>
          <section>{children}</section>
          <section className="w-full flex justify-end items-center">
            <button onClick={submit}>X</button>
          </section>
        </section>
      )}
      {triggerBuilder(() => toggleOpen(true))}
    </div>
  );
};
