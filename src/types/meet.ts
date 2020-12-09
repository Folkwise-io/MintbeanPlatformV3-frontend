import { MeetTypeEnum } from "./enum";
import { ProjectForMeet } from "./project";

export interface Meet {
  id: string;
  title: string;
  description: string;
  instructions: string;
  registerLink?: string;
  registerLinkStatus: RegisterLinkStatus;
  meetType: MeetTypeEnum;
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

export interface CreateMeetInput {
  meetType: MeetTypeEnum;
  title: string;
  description: string;
  instructions: string;
  registerLink?: string;
  coverImageUrl: string;
  startTime: string;
  endTime: string;
  region: string;
}

export interface EditMeetInput {
  meetType?: MeetTypeEnum;
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
