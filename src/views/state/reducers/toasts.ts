import { ToastActionType } from "../actions/actionTypes";
import { Reducer } from "redux";
import { MbAction } from "../actions/MbAction";

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
    case ToastActionType.REMOVE_TOAST: {
      const payload = action.payload;
      if (!payload) {
        return state;
      }
      return state.filter((toast) => toast.id !== payload.id);
    }
    default:
      return state;
  }
};
