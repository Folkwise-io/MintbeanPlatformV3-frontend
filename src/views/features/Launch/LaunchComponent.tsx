import React, { FC } from "react";

type LaunchComponentProps = {
  missionName: string;
};

const LaunchComponent: FC<LaunchComponentProps> = ({ missionName }: LaunchComponentProps) => <p>{missionName}</p>;

export default LaunchComponent;
