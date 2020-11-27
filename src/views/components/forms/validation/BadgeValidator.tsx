import * as yup from "yup";

export const BADGE_VALIDATION = {
  alias: yup.string().max(25, "Alias must be shorter than 25 characters").required("alias is required!"),
  badgeShape: yup
    .string()
    .matches(/(star|square|circle)/, "Invalid shape, please try again")
    .required("badge shape is required!"),
  backgroundHex: yup.string().length(6, "Background hex value must be a valid 6 character hex code"),
  iconHex: yup.string().length(6, "Icon hex value must be a valid 6 character hex code"),
  title: yup
    .string()
    .max(64, "Whoa! we're gonna need a shorter title. (max 64 characters)")
    .required("title is required!"),
  description: yup.string().max(150, "Description must be shorter than 150 characters"),
  weight: yup.number().max(9999, "That number's a bit too high... try one lower than 9999"),
  faIcon: yup.string().required("icon is required!"),
};
