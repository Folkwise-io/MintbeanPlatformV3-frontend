import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "../widgets/CloudinaryUploadWidget";
import { DateUtility } from "../../../utils/DateUtility";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const d = new DateUtility();
const CreateMeetInputSchema = Yup.object().shape({
  meetType: Yup.string().required("Required"),
  title: Yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: Yup.string().min(3, "Too Short!").required("Required"),
  instructions: Yup.string().min(3, "Too Short!").required("Required"),
  registerLink: Yup.string().url("Must be a valid URL").required("Required"),
  coverImageUrl: Yup.string().url("Must be a valid URL").required("Required"),
  startTime: Yup.string()
    .test("is-chronological", "Start time and end time must be chronological", function (startTime) {
      return d.isChronologicalNoTz(startTime || "", this.parent.endTime);
    })
    .required("Required"),
  endTime: Yup.string().required("Required"),
  region: Yup.string().required("Required"),
});

interface Props {
  createMeet: (values: CreateMeetParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const MeetCreateForm: FC<Props> = ({ createMeet, formRef }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(CreateMeetInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetParams) => {
    createMeet(data);
  };

  const grabImageUrl = (url: string) => {
    console.log({ url });
    setImageUrl(url);
    return url;
  };

  const resetImageStates = (): void => {
    setImageUrl("");
  };

  // Form TODO:
  // - instructions: add markdown editor
  // - coverImageUrl: use cloudinary widget, convert to url before submit
  const thumbnailPreview = (
    <div
      className="relative max-w-full bg-white border-dashed border-2 border-gray-700 mb-2"
      style={{ height: "80px" }}
    >
      <img src={imageUrl || undefined} alt="Event image preview" className="w-full h-full object-contain" />
      <button
        onClick={resetImageStates}
        className="absolute bottom-0 right-0 bg-black text-white opacity-75 p-1 rounded "
      >
        Remove
      </button>
    </div>
  );
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit, (e) => console.log({ error: e }))}>
      <h1 className="font-semibold">Create a new event</h1>

      <label htmlFor="meetType">Event type</label>
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
      <CloudinaryUploadWidget exposeImageUrl={grabImageUrl} />

      <label htmlFor="startTime">Start time</label>
      <input type="datetime-local" name="startTime" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.startTime?.message}</p>

      <label htmlFor="endTime">End time</label>
      <input type="datetime-local" name="endTime" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.endTime?.message}</p>

      <label htmlFor="region">Event region</label>
      <select name="region" ref={register}>
        <option value="America/Toronto">Toronto</option>
      </select>
      <p className="text-red-500">{errors.region?.message}</p>
    </form>
  );
};
