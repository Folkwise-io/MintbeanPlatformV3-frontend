// MODELS ---------------------
type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

type Sponsor = {
  name: string;
  blurb?: string; // Message
  image?: string;
};

type HackMeet = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  sponsors: Sponsor[];
  image: string;
  region: string;
};

// STORE ---------------------
type MbAction<T = unknown> = {
  type: string;
  payload?: T;
  loadStatus?: ApiDataStatus;
};

interface LoggedError {
  error: Error; // TODO: type
  timestamp: string;
}

type ApiDataStatus = "LOADING" | "SUCCESS" | "ERROR";

interface StateBranch<T> {
  data: T;
  loadStatus: ApiDataStatus;
}

type UsersState = StateBranch<User[]>;

type ToastState = Toast[];

type ToastTypes = "ERROR" | "WARNING" | "INFO" | "SUCCESS";

interface Toast {
  id: string;
  type: ToastTypes;
  message: string;
}

interface StoreState {
  users: UsersState;
  errors: LoggedError[];
  toasts: ToastState;
}
