import React, { FC, useState } from "react";
import { Launch } from "../../../types/Launch";
import LaunchComponent from "../Launch/LaunchComponent";

type LaunchesComponentProps = {
  launches: Launch[];
  dispatchSetLaunches: (qty: number) => void;
};

const LaunchesComponent: FC<LaunchesComponentProps> = ({ launches, dispatchSetLaunches }: LaunchesComponentProps) => {
  const [qty, setQty] = useState(10);

  const changeHandler = (event: any) => {
    event.persist();

    setQty(event.target.value);
  };

  return (
    <div className="mb-8">
      <h2>Past Launches (max 100)</h2>
      <input
        name="qty"
        type="number"
        min="0"
        max="100"
        onChange={changeHandler}
        value={qty}
        className="border-solid border-2 p-2 mr-2"
      />
      <button onClick={() => dispatchSetLaunches(qty)} className="bg-blue-500 p-2">
        get launches
      </button>
      <ol className="list-decimal">
        {launches.map((l, i) => (
          <li key={i}>
            <LaunchComponent missionName={l.missionName} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LaunchesComponent;
