export enum ErrorActionType {
  LOG_ERROR = "ErrorAction.LOG_ERROR",
}

export enum ToastActionType {
  ADD_TOAST = "ToastAction.ADD_TOAST",
  REMOVE_TOAST = "ToastAction.REMOVE_TOAST",
}

export enum UserActionType {
  FETCH_USERS = "UserAction.FETCH_USERS",
}

export enum AuthActionType {
  LOGIN = "AuthAction.LOGIN",
  LOGOUT = "AuthAction.LOGOUT",
  ME = "AuthAction.ME",
  REGISTER = "AuthAction.REGISTER",
  EDIT_USER = "AuthAction.EDIT_USER",
}
