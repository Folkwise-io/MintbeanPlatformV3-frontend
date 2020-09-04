import { ToastAction } from "../actions/actionTypes";

export const toasterInitialState: ToasterState = [];

export function toasterReducer(state = toasterInitialState, action: MbAction): ToasterState {
  switch (action.type) {
    case ToastAction.ADD_TOAST:
      return [...state, { type: action.payload.type, message: action.payload.message }];
    default:
      return state;
  }
}
