// MODELS ---------------------
type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

// STORE ---------------------
type MbAction = {
  type: string;
  payload?: any;
  loadStatus: ApiDataStatus;
};

type ApiDataStatus = "LOADING" | "SUCCESS" | "ERROR";

interface StateBranch<T> {
  data: T;
  loadStatus: ApiDataStatus;
}

interface UsersState {
  users: StateBranch<User[]>;
}

interface StoreState {
  users: UsersState;
  // toaster: LoaderItem[];
}
