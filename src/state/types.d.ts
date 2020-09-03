export interface LoaderItemInner {
  status: string;
  message: string;
}

export interface LoaderItem {
  [key: string]: LoaderItemInner;
}

export type LoaderState = LoaderItem[];

export type UsersState = User[];

export enum ApiDataStates {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type MbAction = {
  type: string;
  payload: any;
  api?: boolean;
  status?: ApiDataStates;
  message?: string;
};

export interface StoreState {
  users: UsersState;
  loader: LoaderItem[];
}
