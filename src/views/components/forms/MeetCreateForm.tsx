import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget, CloudinaryAssetInfo } from "../widgets/CloudinaryUploadWidget";
import moment from "moment";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createMeetInputSchema = yup.object().shape({
  meetType: yup.string().required("Required"),
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").required("Required"),
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

interface Props {
  createMeet: (values: CreateMeetParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const MeetCreateForm: FC<Props> = ({ createMeet, formRef }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(createMeetInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetParams) => {
    createMeet(data);
  };

  const grabImageData = (data: CloudinaryAssetInfo) => {
    setImageUrl(data.url);
  };

  const resetImageStates = (): void => {
    setImageUrl("");
  };

  // Form TODO:
  // - instructions: add markdown editor
  const thumbnailPreview = (
    <div
      className="relative max-w-full bg-white border-dashed border-2 border-gray-700 mb-2"
      style={{ height: "80px" }}
    >
      <img src={imageUrl || undefined} alt="Meet image preview" className="w-full h-full object-contain" />
      <button
        onClick={resetImageStates}
        type="button"
        className="absolute bottom-0 right-0 bg-black text-white opacity-75 p-1 rounded "
      >
        Remove
      </button>
    </div>
  );
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Create a new meet</h1>

      <label htmlFor="meetType">Meet type</label>
      <select name="meetType" ref={register} className="mb-2">
        <option value="hackMeet">Hackathon</option>
      </select>
      <p className="text-red-500">{errors.meetType?.message}</p>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.title?.message}</p>

      <label htmlFor="description">Description</label>
      <textarea name="description" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.description?.message}</p>

      <label htmlFor="instructions">Instructions</label>
      <textarea name="instructions" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.instructions?.message}</p>

      <label htmlFor="registerLink">Registration link</label>
      <input type="url" name="registerLink" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.registerLink?.message}</p>

      {/* Hidden field for coverImageUrl, value populated by widget */}
      <label htmlFor="coverImageUrl">Cover image</label>
      <input type="hidden" name="coverImageUrl" ref={register} className="mb-2" value={imageUrl} />
      <p className="text-red-500">{errors.coverImageUrl?.message}</p>
      {/* Thumbnail preview */}
      {imageUrl && thumbnailPreview}
      <CloudinaryUploadWidget exposeImageData={grabImageData} />

      <label htmlFor="startTime">Start time</label>
      <input type="datetime-local" name="startTime" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.startTime?.message}</p>

      <label htmlFor="endTime">End time</label>
      <input type="datetime-local" name="endTime" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.endTime?.message}</p>

      <label htmlFor="region">Meet region</label>
      <select name="region" ref={register}>
        <option value="America/Toronto">Toronto</option>
      </select>
      <p className="text-red-500">{errors.region?.message}</p>

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
