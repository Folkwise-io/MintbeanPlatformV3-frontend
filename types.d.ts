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
  kanbanCanonId: string | null;
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

// Re: status - unable to use enum in d.ts file. Using union instead
type KanbanCanonCardStatus = "TODO" | "WIP" | "DONE";
// TODO: how to map card status enum to lower case keys? hard-coding below for now
interface KanbanCardPositions {
  todo: string[];
  wip: string[];
  done: string[];
}

interface InflatedKanbanCardPositions {
  todo: KanbanCanonCard[];
  wip: KanbanCanonCard[];
  done: KanbanCanonCard[];
}

interface KanbanBase {
  id: string;
  title: string;
  description: string;
  meetId?: string;
  cardPositions: KanbanCardPositions;
}
interface KanbanCanonCard {
  id: string;
  kanbanCanonId: string;
  title: string;
  body: string;
  index?: number; // frontend-only: for drag + drop indexing
}

interface KanbanCanon extends KanbanBase {
  kanbanCanonCards: KanbanCanonCard[];
}

interface Kanban extends KanbanBase {
  kanbanCanonId: string;
  userId: string;
  kanbanCards: KanbanCanonCard[];
}

// ARGS ----------------------
interface LoginArgs {
  email: string;
  password: string;
}

// Currently only supports lookup by ID in frontend.
// Backend also allows a composite lookup of kanbanCanonId + userId + (meetId?)
interface FetchKanbanArgs {
  id: string;
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

interface CreateKanbanCanonCardInput {
  title: string;
  body: string;
  kanbanCanonId: string;
}

interface EditKanbanCanonCardInput {
  title?: string;
  body?: string;
}

interface UpdateCardPositionInput {
  cardId: string;
  status: KanbanCanonCardStatus;
  index: number;
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
