// MODELS ---------------------
interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  isAdmin: boolean;
}

interface Sponsor {
  name: string;
  blurb?: string; // Message
  image?: string;
}

type Project = {
  id: string;
  title: string;
  sourceCodeUrl: string;
  image: string;
  liveUrl: string;
  createdAt: string;
  updatedAt: string;
  meetId: string;
  user: User;
};

interface HackMeet {
  id: string;
  title: string;
  description: string;
  instructions: string;
  registerLink?: string;
  meetType: string;
  coverImageUrl: string;
  startTime: string;
  endTime: string;
  region: string;
  // createdAt: string;
  // updatedAt: string;
}

// INPUTS --------------------
interface LoginParams {
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
