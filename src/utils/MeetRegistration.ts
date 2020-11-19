import { RegistrantsForMeet, User } from "../../types";

export class MeetRegistration {
  isRegistered = (registrants?: RegistrantsForMeet[], user?: User): boolean => {
    if (!registrants || !user) return false;
    const registrantIds: string[] = registrants.map((registrant) => registrant.id);
    return registrantIds?.includes(user.id);
  };
}
