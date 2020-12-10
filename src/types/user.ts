import { Meet } from "./meet";

export interface UserForProfile extends User {
  registeredMeets: Meet[];
}
