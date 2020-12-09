import { BadgesForProject } from "./badge";

export interface Project {
  id: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  createdAt: string;
  meet: MeetForProject;
  user: UserForProject;
  mediaAssets: CloudinaryPublicIdMediaAsset[];
  badges: BadgesForProject[];
}

export interface ProjectForMeet {
  id: string;
  title: string;
  sourceCodeUrl: string;
  liveUrl: string;
  user: UserForProjectForMeet;
  mediaAssets: CloudinaryPublicIdMediaAsset[];
  badges: BadgesForProject[];
  createdAt: string;
}
