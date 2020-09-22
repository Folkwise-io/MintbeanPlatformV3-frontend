import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget } from "../widgets/CloudinaryUploadWidget";
import { ImageDisplay } from "../ImageDisplay";

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
  userId: string;
  meetId: string;
  className?: string;
}

export const ProjectCreateForm: FC<Props> = ({ createProject, formRef, userId, meetId, className }) => {
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

  const resetCloudinaryIds = (): void => {
    setCloudinaryIds([]);
  };

  const thumbnailPreview = (
    <div
      className="relative max-w-full bg-white border-dashed border-2 border-gray-700 mb-2"
      style={{ height: "80px" }}
    >
      {cloudinaryIds.map((cpid, i) => (
        <ImageDisplay key={i} cloudinaryPublicId={cpid} />
      ))}
      <button
        onClick={resetCloudinaryIds}
        type="button"
        className="absolute bottom-0 right-0 bg-black text-white opacity-75 p-1 rounded "
      >
        Remove all
      </button>
    </div>
  );
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={className ? className : ""}>
      <h3 className="font-semibold">Submit a project</h3>

      {/* hidden inputs for meetId and userId */}
      <input type="hidden" name="uderId" ref={register} value={userId} />
      {/* TODO: remove error msg in UI - for dev purpose only */}
      <p className="text-red-500">{errors.userId?.message}</p>
      <input type="hidden" name="meetId" ref={register} value={meetId} />
      {/* TODO: remove error msg in UI - for dev purpose only */}
      <p className="text-red-500">{errors.meetId?.message}</p>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.title?.message}</p>

      <label htmlFor="sourceCodeUrl">Source code url</label>
      <input type="url" name="sourceCodeUrl" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.sourceCodeUrl?.message}</p>

      <label htmlFor="liveUrl">Deployment url</label>
      <input type="url" name="liveUrl" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.liveUrl?.message}</p>

      {/* Hidden field for cloudinaryPublicIds, value populated by widget and local state */}
      <label htmlFor="cloudinaryPublicIds">Cover image</label>
      <input type="hidden" name="cloudinaryPublicIds" ref={register} className="mb-2" value={cloudinaryIds} />
      <p className="text-red-500">{errors.coverImageUrl?.message}</p>
      {/* Thumbnail preview */}
      {cloudinaryIds && thumbnailPreview}
      <CloudinaryUploadWidget exposeImageUrl={addCloudinaryId} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
