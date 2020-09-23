import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget, CloudinaryAssetInfo } from "../widgets/CloudinaryUploadWidget";
import { ImageDisplay } from "../ImageDisplay";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createProjectInputSchema = yup.object().shape({
  userId: yup.string().uuid("userId must be a valid UUID"),
  meetId: yup.string().uuid("userId must be a valid UUID"),
  title: yup.string().max(64, "Title can be a maximum of 64 characters").required("Project title required!"),
  sourceCodeUrl: yup.string().url("Source code URL must be a valid URL").required("Source code URL required!"),
  liveUrl: yup.string().url("Deployment URL must be a valid URL").required("Deployment URL required!"),
  // cloudinaryPublicIds: yup.array().of(yup.string()).min(1).required("Must submit at least one asset!"),
});

interface Props {
  createProject: (values: CreateProjectParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
  user: User;
  meetId: string;
  className?: string;
}

export const ProjectCreateForm: FC<Props> = ({ createProject, formRef, user, meetId, className }) => {
  const [cloudinaryIds, setCloudinaryIds] = useState<string[]>([]);

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(createProjectInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateProjectParams) => {
    const dataWithCloudinaryIds = { ...data, cloudinaryPublicIds: cloudinaryIds };
    createProject(dataWithCloudinaryIds);
  };

  const addCloudinaryId = (data: CloudinaryAssetInfo) => {
    //TODO
    setCloudinaryIds(cloudinaryIds.concat(data.public_id));
    return data.public_id;
  };

  const resetCloudinaryIds = (): void => {
    setCloudinaryIds([]);
  };

  const thumbnailPreview = (
    <div
      className="relative max-w-full bg-white border-dashed border-2 border-gray-700 mb-2 flex flex-wrap justify-center items-center"
      style={{ height: "80px" }}
    >
      {cloudinaryIds.map((cpid, i) => (
        <div key={i} className="flex-shrink ">
          <div className="w-1/4" style={{ height: "74px" }}>
            <ImageDisplay cloudinaryPublicId={cpid} className="w-full h-full" />
          </div>
        </div>
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
  const onError = (e) => console.log(e);
  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)} className={className ? className : ""}>
      <h3 className="font-semibold">Submit a project</h3>

      {user.isAdmin ? (
        <>
          {/* Admin view: allow submission on behalf of another user */}
          {/* TODO: implement user search instead of relying on userId string input */}
          <label htmlFor="userId">Submitting on behalf of (user ID):</label>
          <input type="text" name="userId" ref={register} />
          <p className="text-red-500">{errors.userId?.message}</p>
        </>
      ) : (
        <>
          {/* Regular user view: infer userID without prompting */}
          <input type="hidden" name="userId" ref={register} value={user.id} />
          <p className="text-red-500">{errors.userId?.message}</p>
        </>
      )}

      {/* Infer meetId without prompting */}
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
      <label htmlFor="cloudinaryPublicIds">Images and/or GIFs</label>
      <input type="hidden" name="cloudinaryPublicIds" ref={register} className="mb-2" value={cloudinaryIds} />
      <p className="text-red-500">{errors.coverImageUrl?.message}</p>
      {/* Thumbnail preview */}
      {cloudinaryIds.length && thumbnailPreview}
      <CloudinaryUploadWidget exposeImageData={addCloudinaryId} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
