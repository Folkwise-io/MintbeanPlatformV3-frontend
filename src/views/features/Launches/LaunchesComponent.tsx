import React, { FC } from "react";
import { Launch } from "../../../types/Launch";
import LaunchComponent from "../Launch/LaunchComponent";

type LaunchesComponentProps = {
  launches: Launch[];
  dispatchSetLaunches: () => void;
};

const LaunchesComponent: FC<LaunchesComponentProps> = ({ launches, dispatchSetLaunches }: LaunchesComponentProps) => (
  <div>
    <h2>Launches</h2>
    <button onClick={dispatchSetLaunches}>get launches</button>
    {launches.map((l, i) => (
      <LaunchComponent key={i} missionName={l.missionName} />
    ))}
  </div>
);

export default LaunchesComponent;
