import { Option } from "../blocks/Form/formTypes";

export const meetTypeOptions: Option[] = [
  { value: "hackathon", label: "Hackathon" },
  { value: "workshop", label: "Workshop" },
  { value: "webinar", label: "Webinar" },
  { value: "lecture", label: "Lecture" },
];

export const regionOptions: Option[] = [{ value: "America/Toronto", label: "Toronto" }];

export const badgeShapeOptions: Option[] = [
  { value: "circle", label: "Circle" },
  { value: "square", label: "Square" },
  { value: "star", label: "Star" },
];

export const meetTypeFilterOptions: Option[] = [
  { value: "all", label: "All" },
  { value: "hackathon", label: "Hackathon" },
  { value: "workshop", label: "Workshop" },
  { value: "webinar", label: "Webinar" },
  { value: "lecture", label: "Lecture" },
];

export const dateFilterOptions: Option[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All" },
];
