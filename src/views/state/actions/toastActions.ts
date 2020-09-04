import { ToastActionType } from "./actionTypes";

const toastActionHoc = (type: ToastTypes) => (message: string): MbAction<Toast> => ({
  type: ToastActionType.ADD_TOAST,
  payload: {
    type,
    message,
  },
});

//TODO: Call this 'addDangerToast' and change type to "DANGER"
export const addErrorToast = toastActionHoc("ERROR");
export const addWarningToast = toastActionHoc("WARNING");
export const addInfoToast = toastActionHoc("INFO");
export const addSuccessToast = toastActionHoc("SUCCESS");
