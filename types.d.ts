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
  color?: string; // Banner Color
  image: string;
};

type HackEvent = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  sponsors: Sponsor[];
  image: string;
  colors: string[]; // gradient for events
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
