import { UserActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { Dispatch } from "redux";
import { MbAction } from "./MbAction";

const action = (loadStatus: ApiDataStatus, payload?: User[]): MbAction<User[]> => ({
  type: UserActionType.FETCH_USERS,
  payload,
  loadStatus,
});

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(action("LOADING"));
    return context.userService
      .fetchUsers()
      .then((users) => {
        if (!users) {
          dispatch(action("ERROR"));
          throw null;
        }
        context.loggerService.success("Successfully fetched users!");
        return dispatch(action("SUCCESS", users));
      })
      .catch((err) => {
        context.loggerService.handleGraphqlErrors(err);
        return dispatch(action("ERROR"));
      });
  };
}
