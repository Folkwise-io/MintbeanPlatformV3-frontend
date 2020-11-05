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

/** Whether registration is going to open, is open now, or is closed. */
type RegisterLinkStatus = "WAITING" | "OPEN" | "CLOSED";

interface Meet {
  id: string;
  title: string;
  description: string;
  instructions: string;
  registerLink?: string;
  registerLinkStatus: RegisterLinkStatus;
  meetType: "hackMeet"; // TODO: change to enum, extend variants once more meet types
  coverImageUrl: string;
  startTime: string;
  endTime: string;
  region: string;
  projects: ProjectForMeet[];
  registrants: RegistrantsForMeet[];
  kanbanCanon: KanbanCanon | null;
  kanbanCanonId: KanbanCanon | null;
  kanbanId: string | null;
  kanban: Kanban | null;
}

interface ProjectForMeet {
  id: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  user: UserForProjectForMeet;
  mediaAssets: CloudinaryPublicIdMediaAsset[];
}

interface RegistrantsForMeet {
  id: string;
  firstName: string;
  lastName: string;
}

interface UserForProjectForMeet {
  firstName: string;
  lastName: string;
}

interface CloudinaryPublicIdMediaAsset {
  cloudinaryPublicId: string;
}

interface KanbanBase {
  id: string;
  title: string;
  description: string;
}
// Re: status - unable to use enum in d.ts file. Using union instead
type KanbanCanonCardStatus = "TODO" | "WIP" | "DONE";

interface KanbanCardBase {
  id: string;
  title: string;
  body: string;
  status: KanbanCanonCardStatus;
  index?: number;
}

interface KanbanCanonCard extends KanbanCardBase {
  kanbanCanonId: string;
}

interface KanbanCard extends KanbanCardBase {
  kanbanId: string;
}

interface KanbanCanon extends KanbanBase {
  kanbanCanonCards: KanbanCanonCard[];
}

interface Kanban extends KanbanBase {
  kanbanCanonId: string;
  userId: string;
  meetId?: string;
  kanbanCards: KanbanCard[];
}

// ARGS ----------------------
interface LoginArgs {
  email: string;
  password: string;
}

interface FetchKanbanArgs {
  kanbanCanonId: string;
  userId: string;
  meetId?: string | null;
}

// INPUTS --------------------
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface CreateMeetInput {
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
interface EditMeetInput {
  meetType?: "hackMeet";
  title?: string;
  description?: string;
  instructions?: string;
  registerLink?: string;
  coverImageUrl?: string;
  startTime?: string;
  endTime?: string;
  region?: string;
  kanbanCanonId?: string;
}

interface CreateProjectInput {
  userId: string;
  meetId: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  cloudinaryPublicIds: string[];
}

interface CreateKanbanCanonInput {
  meetId?: string;
  title: string;
  description: string;
}

interface EditKanbanCanonInput {
  title?: string;
  description?: string;
}

interface CreateKanbanInput {
  meetId?: string;
  userId: string;
  kanbanCanonId: string;
}

interface UpdateKanbanCardInput {
  id: string;
  kanbanId: string;
  status: KanbanCanonCardStatus;
}

interface CreateKanbanCanonCardInput {
  title: string;
  body: string;
  index?: number;
  kanbanId: string;
}
// Same as CreateKanbanCardInput atm
interface EditKanbanCanonCardInput {
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
