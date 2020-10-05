// MODELS ---------------------
interface User {
  id: string;
  email: string;
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
  id: string;
  firstName: string;
  lastName: string;
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
  kanbanId?: string;
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
}

interface CloudinaryPublicIdMediaAsset {
  cloudinaryPublicId: string;
}

interface Kanban {
  id: string;
  title: string;
  description: string;
  kanbanCards: KanbanCard[];
}

interface KanbanCard {
  id: string;
  title: string;
  body: string;
  index: number;
}

// INPUTS --------------------
interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  firstName: string;
  lastName: string;
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
// Same as CreateMeetUnput atm
interface EditMeetParams {
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
  userId: string;
  meetId: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  cloudinaryPublicIds: string[];
}

interface CreateKanbanInput {
  title: string;
  description: string;
}
// Same as CreateKanbanInput atm
interface EditKanbanInput {
  title: string;
  description: string;
}

interface CreateKanbanCardInput {
  title: string;
  body: string;
  index?: number;
  kanbanId: string;
}
// Same as CreateKanbanCardInput atm
interface EditKanbanCardInput {
  title: string;
  body: string;
  index?: number;
  kanbanId: string;
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

// OTHER -------------------------
// to allow imports of md files in components
declare module "*.md" {
  const value: string;
  export default value;
}
