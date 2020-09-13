import { AuthActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { Dispatch } from "redux";
import { MbAction } from "./MbAction";

const action = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.LOGIN,
  payload,
  loadStatus,
});

export function login(loginInput: LoginInput): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(action("LOADING"));
    return context.authService
      .login(loginInput)
      .then((user: User | void) => {
        console.log("entered auth action then", user);
        if (!user) {
          console.log("entered auth action then !user", user);
          dispatch(action("ERROR"));
          throw null;
        }
        console.log("entered auth action then success");
        context.loggerService.success("Successfully logged in.");
        return dispatch(action("SUCCESS", user));
      })
      .catch(() => {
        console.log("entered auth action catch");
        return dispatch(action("ERROR"));
      });
  };
}
