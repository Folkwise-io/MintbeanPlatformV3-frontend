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

interface Project {
  id: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  createdAt: string;
  meet: MeetForProject;
  user: UserForProject;
  mediaAssets: CloudinaryPublicIdMediaAsset[];
}
interface UserForProject {
  firstName: string;
  lastName: string;
  username: string;
}
interface MeetForProject {
  id: string;
  title: string;
}

interface Meet {
  id: string;
  title: string;
  description: string;
  instructions: string;
  registerLink?: string;
  meetType: "hackMeet"; // TODO: change to enum, extend variants once more meet types
  coverImageUrl: string;
  startTime: string;
  endTime: string;
  region: string;
  projects: ProjectForMeet[];
}
interface ProjectForMeet {
  id: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  user: UserForProjectForMeet;
  mediaAssets: CloudinaryPublicIdMediaAsset[];
}
interface UserForProjectForMeet {
  firstName: string;
  lastName: string;
  username: string;
}

interface CloudinaryPublicIdMediaAsset {
  cloudinaryPublicId: string;
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

interface CreateMeetParams {
  meetType: "hackMeet";
  title: string;
  description: string;
  instructions: string;
  registerLink?: string;
  coverImageUrl: string;
  startTime: string;
  endTime: string;
  region: string;
}

interface CreateProjectParams {
  meetId: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  cloudinaryPublicIds: string[];
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
