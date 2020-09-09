import React, { FC, ReactElement } from "react";

type ModalProps = {
  position?: "relative";
};

export const Modal: FC<ModalProps> = ({ children, position }): ReactElement => {
  React.Children.count(children);
  return (
    <div className={position}>
      <section>{children}</section>
    </div>
  );
};
