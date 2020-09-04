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
  loadStatus?: ApiDataStatus;
};

interface LoggedError {
  error: any; // TODO: type
  timestamp: string;
}

type ErrorsState = LoggedError[];

type ApiDataStatus = "LOADING" | "SUCCESS" | "ERROR";

interface StateBranch<T> {
  data: T;
  loadStatus: ApiDataStatus;
}

type UsersState = StateBranch<User[]>;

type ToastTypes = "SUCCESS" | "ERROR" | "WARNING";

interface Toast {
  type: ToastTypes;
  message: string;
}

type ToasterState = Toast[];

interface StoreState {
  users: UsersState;
  errors: ErrorsState;
  toaster: ToasterState;
}
