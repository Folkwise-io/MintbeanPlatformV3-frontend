import { ToastActionType } from "./actionTypes";

type ToastActionPayloadType = "ERROR" | "WARNING" | "INFO";

type ToastActionPayload = {
  type: ToastActionPayloadType;
  message: string;
};

const toastActionHoc = (type: ToastActionPayloadType) => (message: string) => (): MbAction<ToastActionPayload> => ({
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
