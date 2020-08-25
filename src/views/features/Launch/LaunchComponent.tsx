import React, { FC } from "react";
import { Launch } from "../../../types/Launch";

type LaunchComponentProps = {
  missionName: Launch;
};

const TSComponent: FC<LaunchComponentProps> = ({ missionName }: LaunchComponentProps) => (
  <div>
    <p>{missionName}</p>
  </div>
);

export default TSComponent;
