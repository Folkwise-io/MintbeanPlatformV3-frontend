export interface LinkInput {
  label: string;
  route: string;
}

export const NAV_LINKS: LinkInput[] = [
  {
    label: "Meets",
    route: "/",
  },
  {
    label: "Community",
    route: "/community",
  },
  {
    label: "Badges",
    route: "/badges",
  },
];

export const NAV_ADMIN_LINKS: LinkInput[] = [
  {
    label: "Admin",
    route: "/admin",
  },
];

export const NAV_STYLES = "mb-transition mx-2 text-black hover:text-mb-green-200 focus:text-mb-green-200";
