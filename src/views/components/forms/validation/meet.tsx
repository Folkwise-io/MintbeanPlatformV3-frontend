import moment from "moment";
import * as yup from "yup";
import { meetTypeRegex } from "../constants";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
export const createMeetInputSchema = yup.object().shape({
  meetType: yup.string().matches(meetTypeRegex, "Invalid meetType, please try again.").required("Required"),
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(400, "Max characters: 400").required("Required"),
  instructions: yup.string().min(3, "Too Short!").required("Required"),
  registerLink: yup.string().url("Must be a valid URL (https://...)").required("Required"),
  coverImageUrl: yup.string().url("Must be a valid URL (https://...)").required("Required"),
  startTime: yup
    .string()
    .test("is-chronological", "Start time and end time must be chronological", function (startTime) {
      const isChronological = moment(startTime).isBefore(this.parent.endTime);
      return isChronological;
    })
    .required("Required"),
  endTime: yup.string().required("Required"),
  region: yup.string().required("Required"),
});

// this is same as createMeetInputSchema.... consolidate
export const editMeetInputSchema = yup.object().shape({
  meetType: yup.string().matches(meetTypeRegex, "Invalid meetType, please try again.").required("Required"),
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(400, "Max characters: 400").required("Required"),
  instructions: yup.string().min(3, "Too Short!").required("Required"),
  registerLink: yup.string().url("Must be a valid URL (https://...)").required("Required"),
  coverImageUrl: yup.string().url("Must be a valid URL (https://...)").required("Required"),
  startTime: yup
    .string()
    .test("is-chronological", "Start time and end time must be chronological", function (startTime) {
      const isChronological = moment(startTime).isBefore(this.parent.endTime);
      return isChronological;
    })
    .required("Required"),
  endTime: yup.string().required("Required"),
  region: yup.string().required("Required"),
});
