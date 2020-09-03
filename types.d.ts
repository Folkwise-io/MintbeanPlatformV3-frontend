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

type UsersState = StateBranch<User[]>;

interface StateBranch<T> {
  data: T;
  loadStatus: ApiDataStatus;
}

type ApiDataStatus = "LOADING" | "SUCCESS" | "ERROR";

type MbAction = {
  type: string;
  payload?: any;
  loadStatus: ApiDataStatus;
};

interface StoreState {
  users: UsersState;
  // toaster: LoaderItem[];
}
