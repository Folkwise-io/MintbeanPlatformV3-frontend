import React, { FC } from "react";
import { connect } from "react-redux";
import LaunchesComponent from "./LaunchesComponent";
import { setLaunches } from "../../../state/actions/launchActions";
import { StoreState } from "../../../state/types";
import { Launch } from "../../../types/Launch";

interface LaunchesContainerProps {
  launches: Launch[];
  dispatchSetLaunches: (qty: number) => void;
}

const mapStateToProps = (state: StoreState) => {
  const { launches } = state;
  /* eslint-disable no-debugger */
  debugger;
  /* eslint-enable no-debugger */
  return { launches };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchSetLaunches: (qty: number): void => dispatch(setLaunches(qty)),
});

const LaunchesContainer: FC<LaunchesContainerProps> = ({
  launches,
  dispatchSetLaunches,
}: LaunchesContainerProps): React.ReactElement => {
  const setLaunches = (qty: number): void => {
    dispatchSetLaunches(qty);
  };

  return <LaunchesComponent launches={launches} dispatchSetLaunches={setLaunches} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchesContainer);
