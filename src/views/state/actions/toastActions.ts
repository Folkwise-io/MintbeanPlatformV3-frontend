import { ToastAction } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";

const toastActionHoc = (type: string) => (message: string): ThunkAction<void, StoreState, Context, MbAction> => (
  dispatch: any,
) => {
  return dispatch({
    type: ToastAction.ADD_TOAST,
    payload: {
      type,
      message,
    },
  });
};

//TODO: Call this 'addDangerToast' and change type to "DANGER"
export const addErrorToast = toastActionHoc("ERROR");
export const addWarningToast = toastActionHoc("WARNING");
export const addInfoToast = toastActionHoc("INFO");
