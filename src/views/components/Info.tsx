import React, { FC } from "react";
import infoIcon from "../../assets/info-icon.png";
export type InfoProps = {
  info: string;
};

export const Info: FC<InfoProps> = ({ info }) => {
  return (
    <label htmlFor="info-check" data-info={info}>
      <input type="checkbox" id="info-check" />
      <img src={infoIcon} alt="click to see more information"/>
    </label>
  );
};
