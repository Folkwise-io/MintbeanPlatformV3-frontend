import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "../widgets/CloudinaryUploadWidget";
import moment from "moment";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createProjectInputSchema = yup.object().shape({
  userId: yup.string().uuid("userId must be a valid UUID"),
  meetId: yup.string().uuid("userId must be a valid UUID"),
  title: yup.string().max(64, "Title can be a maximum of 64 characters").required("Project title required!"),
  sourceCodeUrl: yup.string().url("Source code URL must be a valid URL").required("Source code URL required!"),
  liveUrl: yup.string().url("Deployment URL must be a valid URL").required("Deployment URL required!"),
  cloudinaryPublicIds: yup.array().of(yup.string()).min(1).required("Must submit at least one asset!"),
});

interface Props {
  createProject: (values: CreateProjectParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const ProjectCreateForm: FC<Props> = ({ createProject, formRef }) => {
  const [cloudinaryIds, setCloudinaryIds] = useState<string[]>([]);

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(createProjectInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateProjectParams) => {
    createProject(data);
  };

  const addCloudinaryId = (id: string) => {
    //TODO
    setCloudinaryIds(cloudinaryIds.concat(id));
    return id;
  };

  const resetAssetIds = (): void => {
    setCloudinaryIds([]);
  };

  // Form TODO:
  const thumbnailPreview = (
    <div
      className="relative max-w-full bg-white border-dashed border-2 border-gray-700 mb-2"
      style={{ height: "80px" }}
    >
    {cloudinaryIds.map((c,i) => )}
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
      <CloudinaryUploadWidget exposeImageUrl={grabImageUrl} />

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
