import { ToastActionType } from "../actions/actionTypes";
import { Reducer } from "redux";

export const toastsInitialState: ToastState = [];

export const toastsReducer: Reducer<ToastState, MbAction<Toast>> = (
  state = toastsInitialState,
  action: MbAction<Toast>,
): ToastState => {
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
