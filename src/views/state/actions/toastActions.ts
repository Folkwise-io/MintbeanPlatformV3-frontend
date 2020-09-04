import { ToastActionType } from "./actionTypes";
import { v4 as uuidV4 } from "uuid";

const toastActionHoc = (type: ToastTypes) => (message: string): MbAction<Toast> => ({
  type: ToastActionType.ADD_TOAST,
  payload: {
    id: uuidV4(),
    type,
    message,
  },
});

//TODO: Call this 'addDangerToast' and change type to "DANGER"
export const addErrorToast = toastActionHoc("ERROR");
export const addWarningToast = toastActionHoc("WARNING");
export const addInfoToast = toastActionHoc("INFO");
export const addSuccessToast = toastActionHoc("SUCCESS");
export const removeToast = (id: string): MbAction => ({
  type: ToastActionType.REMOVE_TOAST,
  payload: {
    id,
    type: ToastActionType.REMOVE_TOAST,
  },
});
