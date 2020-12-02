import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget, CloudinaryAssetInfo } from "../widgets/CloudinaryUploadWidget";
import { ImageDisplay } from "../ImageDisplay";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { Input } from "../blocks/Form/Input";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createProjectInputSchema = yup.object().shape({
  userId: yup.string().uuid("userId must be a valid UUID"),
  meetId: yup.string().uuid("userId must be a valid UUID"),
  title: yup.string().max(64, "Title can be a maximum of 64 characters").required("Project title required!"),
  sourceCodeUrl: yup.string().url("Must be a valid URL (https://...)").required("Source code URL required!"),
  liveUrl: yup.string().url("Must be a valid URL (https://...)").required("Deployment URL required!"),
  // cloudinaryPublicIds: yup.array().of(yup.string()).min(1).required("Must submit at least one asset!"),
});

interface Props {
  createProject: (values: CreateProjectInput) => void;
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
  const onSubmit = (data: CreateProjectInput) => {
    const dataWithCloudinaryIds = { ...data, cloudinaryPublicIds: cloudinaryIds };
    createProject(dataWithCloudinaryIds);
  };

  const addCloudinaryId = (data: CloudinaryAssetInfo) => {
    setCloudinaryIds((prevState) => [...prevState, data.public_id]);
  };
  const removeCloudinaryIdAt = (i: number): void => {
    setCloudinaryIds((prevState) => {
      const copy = [...prevState];
      copy.splice(i, 1);
      return copy;
    });
  };
  const resetCloudinaryIds = (): void => {
    setCloudinaryIds([]);
  };

  const thumbnailPreview = (
    <div
      className="relative w-full bg-white border-dashed border-2 border-gray-700 mb-2 ml-2"
      style={{ maxWidth: "200px" }}
    >
      {cloudinaryIds.map((cpid, i) => (
        <div key={i} className="relative">
          <button
            type="button"
            onClick={() => removeCloudinaryIdAt(i)}
            className="absolute top-0 right-0 bg-black text-white opacity-75 px-1 rounded-full"
          >
            X
          </button>
          <div className="" style={{ height: "74px" }}>
            <ImageDisplay cloudinaryPublicId={cpid} className="max-h-full" />
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

  /* Admin view: allow submission on behalf of another user */
  /* TODO: implement user search instead of relying on userId string input */
  const renderAdminInputs = () => (
    <>
      <Input label="Submitting on behalf of (user ID):" name="userId" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.userId?.message} />
    </>
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={className ? className : ""}>
      <H2>Submit a project</H2>

      {user.isAdmin ? (
        renderAdminInputs()
      ) : (
        <>
          {/* Regular user view: infer userID without prompting */}
          <input type="hidden" name="userId" ref={register} value={user.id} />
        </>
      )}

      {/* Infer meetId without prompting */}
      <input type="hidden" name="meetId" ref={register} value={meetId} />

      <Input label="Title" name="title" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <Input label="Cource code url" name="sourceCodeUrl" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.sourceCodeUrl?.message} />

      <Input label="Deployment url" name="liveUrl" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.liveUrl?.message} />

      {/* Hidden field for cloudinaryPublicIds, value populated by widget and local state */}
      <label htmlFor="cloudinaryPublicIds">Images and/or GIFs</label>
      <p>
        <em className="font-normal">(First one will be cover image)</em>
      </p>
      <input type="hidden" name="cloudinaryPublicIds" ref={register} className="mb-2" value={cloudinaryIds} />
      <FormValidationErrorMsg errorMessage={errors.coverImageUrl?.message} />
      <div className="flex flex-col align-items">
        {/* Thumbnail preview */}
        {cloudinaryIds.length ? thumbnailPreview : null}
        <CloudinaryUploadWidget exposeImageData={addCloudinaryId} />
      </div>

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
