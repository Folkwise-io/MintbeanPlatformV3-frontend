import { BadgeShapeEnum, MeetTypeEnum } from "../../../types/enum";
import { Option } from "../blocks/Form/formTypes";

export const meetTypeOptions: Option[] = [
  { value: MeetTypeEnum.Hackathon, label: "Hackathon" },
  { value: MeetTypeEnum.Workshop, label: "Workshop" },
  { value: MeetTypeEnum.Webinar, label: "Webinar" },
  { value: MeetTypeEnum.Lecture, label: "Lecture" },
];

export const regionOptions: Option[] = [{ value: "America/Toronto", label: "Toronto" }];

export const badgeShapeOptions: Option[] = [
  { value: BadgeShapeEnum.Circle, label: "Circle" },
  { value: BadgeShapeEnum.Square, label: "Square" },
  { value: BadgeShapeEnum.Star, label: "Star" },
];

export const meetTypeFilterOptions: Option[] = [
  { value: "all", label: "All" },
  { value: MeetTypeEnum.Hackathon, label: "Hackathon" },
  { value: MeetTypeEnum.Workshop, label: "Workshop" },
  { value: MeetTypeEnum.Webinar, label: "Webinar" },
  { value: MeetTypeEnum.Lecture, label: "Lecture" },
];

export const dateFilterOptions: Option[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All" },
];

export const meetTypeRegex = new RegExp(`^(${Object.values(MeetTypeEnum).join("|")})$`, "i");

export const badgeShapeRegex = new RegExp(`^(${Object.values(BadgeShapeEnum).join("|")})$`, "i");
