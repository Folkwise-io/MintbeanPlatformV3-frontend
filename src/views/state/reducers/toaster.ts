import { ToastActionType } from "../actions/actionTypes";
import { Reducer } from "redux";

export const toasterInitialState: Toast[] = [];

export const toasterReducer: Reducer<Toast[], MbAction<Toast>> = (
  state = toasterInitialState,
  action: MbAction<Toast>,
): Toast[] => {
  switch (action.type) {
    case ToastActionType.ADD_TOAST: {
      const payload = action.payload;
      if (!payload) {
        return state;
      }
      return [...state, payload];
    }
    default:
      return state;
  }
};
