import React, { FC, useState } from "react";
import infoIcon from "../../assets/info-icon.png";
export type InfoProps = {
  info: string;
};

export const Info: FC<InfoProps> = ({ info, children }) => {
  const [infoModal, openCloseInfo] = useState(false);

  return (
    <div>
      <button onClick={() => openCloseInfo(!infoModal)} data-info={info}>
        <img className="pointer-events-none" src={infoIcon} alt="click to see more information" />
      </button>
      {infoModal && <section>{children}</section>}
    </div>
  );
};
