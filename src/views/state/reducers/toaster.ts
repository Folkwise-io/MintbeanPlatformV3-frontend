import { ADD_TOAST } from "../actions/toastActionsTypes";

export const toasterInitialState: ToasterState = [];

export function toasterReducer(state = toasterInitialState, action: MbAction): ToasterState {
  switch (action.type) {
    case ADD_TOAST:
      return [...state, { type: action.payload.type, message: action.payload.message }];
    default:
      return state;
  }
}
