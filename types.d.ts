type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

interface LoaderItemInner {
  status: string;
  message: string;
}

interface LoaderItem {
  [key: string]: LoaderItemInner;
}

type LoaderState = LoaderItem[];

type UsersState = User[];

type ApiDataStates = "LOADING" | "SUCCESS" | "ERROR";

type MbAction = {
  type: string;
  payload: any;
  api?: boolean;
  status?: ApiDataStates;
  message?: string;
};

interface StoreState {
  users: UsersState;
  loader: LoaderItem[];
}
