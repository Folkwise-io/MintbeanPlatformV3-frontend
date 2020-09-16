// MODELS ---------------------
interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

interface Sponsor {
  name: string;
  blurb?: string; // Message
  image?: string;
}

interface HackMeet {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  sponsors: Sponsor[];
  image: string;
  region: string;
}

// INPUTS --------------------
interface LoginInput {
  email: string;
  password: string;
}

interface RegisterParams {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// API -----------------------
interface ApiResponseRaw<T> {
  data: T;
  errors?: ServerError[];
}

interface ServerError {
  message: string;
  extensions: { code: string };
}

// STORE ---------------------
interface LoggedError {
  id: string;
  message: string;
  code: string;
  timestamp: string;
}

type ApiDataStatus = "LOADING" | "SUCCESS" | "ERROR";

interface StateBranch<T> {
  data: T;
  loadStatus: ApiDataStatus;
}

type UsersState = StateBranch<User[]>;

type UserState = StateBranch<User | undefined>;

type ToastState = Toast[];

type ToastTypes = "DANGER" | "WARNING" | "INFO" | "SUCCESS";

interface Toast {
  id: string;
  type: ToastTypes;
  message: string;
}

interface StoreState {
  user: UserState;
  users: UsersState;
  errors: LoggedError[];
  toasts: ToastState;
}
