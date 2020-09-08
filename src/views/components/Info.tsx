import React, { FC, useState } from "react";
import infoIcon from "../../assets/info-icon.png";
export type InfoProps = {
  info: string;
};

export const Info: FC<InfoProps> = ({ info, children }) => {
  const [infoModal, openCloseInfo] = useState(false);

  return (
    <div>
      <label htmlFor="info-check" data-info={info}>
        <input
          type="checkbox hidden"
          defaultChecked={infoModal}
          onChange={() => openCloseInfo(!infoModal)}
          id="info-check"
        />
        <img className="pointer-events-none" src={infoIcon} alt="click to see more information" />
      </label>
      {infoModal && <section>{children}</section>}
    </div>
  );
};
