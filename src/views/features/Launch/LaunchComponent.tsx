import React, { FC } from "react";
import { Launch } from "../../../types/Launch";

type LaunchComponentProps = {
  missionName: string;
};

const LaunchComponent: FC<LaunchComponentProps> = ({ missionName }: LaunchComponentProps) => (
  <div>
    <p>{missionName}</p>
  </div>
);

export default LaunchComponent;
