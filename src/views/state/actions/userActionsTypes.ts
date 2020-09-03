export const FETCH_USERS = "FETCH_USERS";

interface GetUsersAction {
  type: typeof FETCH_USERS;
  payload: Promise<User[]> | null;
}

export type UserActionsTypes = GetUsersAction;
