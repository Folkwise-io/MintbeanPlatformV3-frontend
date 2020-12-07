import React, { FC, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CloudinaryUploadWidget, CloudinaryAssetInfo } from "../widgets/CloudinaryUploadWidget";
import moment from "moment";
import { MarkdownEditor } from "../MarkdownEditor";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { Select } from "../blocks/Form/Select";
import { Input } from "../blocks/Form/Input";
import { TextArea } from "../blocks/Form/TextArea";
import { meetTypeOptions, regionOptions } from "./constants";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
// this is same as createMeetInputSchema.... consolidate
const editMeetInputSchema = yup.object().shape({
  meetType: yup.string().required("Required"),
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(160, "Max characters: 160").required("Required"),
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
  editMeet: (values: EditMeetInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
  meet: Meet;
}

const chopOffSecMs = (timestr: string): string => {
  return timestr.replace(/:\d{2}\.\d{3}$/, "");
};

export const MeetEditForm: FC<Props> = ({ editMeet, formRef, meet }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const { errors, register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(editMeetInputSchema),
    // pre-populate form
    defaultValues: {
      meetType: meet.meetType,
      title: meet.title,
      description: meet.description,
      instructions: meet.instructions,
      registerLink: meet.registerLink,
      coverImageUrl: meet.coverImageUrl,
      // make startTime/endTime more user friendly for date picker
      startTime: chopOffSecMs(meet.startTime),
      endTime: chopOffSecMs(meet.endTime),
      region: meet.region,
    },
  });

  // initialize coverImageUrl (controlled input) on mount
  useEffect(() => {
    setImageUrl(meet.coverImageUrl);
  }, [meet]);

  useEffect(() => {
    register({ name: "instructions" });
  }, [register]);

  const instructions = watch("instructions");

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetInput) => {
    editMeet(data);
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
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Edit this meet</H2>

      <Select label="Meet type" name="meetType" ref={register} options={meetTypeOptions} />
      <FormValidationErrorMsg errorMessage={errors.meetType?.message} />

      <Input label="Title" name="title" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <TextArea label="Description" name="description" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.description?.message} />

      {/* TODO: Is it wise to refactor these three lines to separate compoment? Has react-hook-form dependencies so thought I'd leave it where it's easy to see what's going on*/}
      <label htmlFor="instructions">Instructions</label>
      <MarkdownEditor value={instructions} onChange={(value) => setValue("instructions", value)} />
      <FormValidationErrorMsg errorMessage={errors.instructions?.message} />

      <Input type="url" label="Zoom link" name="registerLink" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.registerLink?.message} />

      {/* Hidden field for coverImageUrl, value populated by widget */}
      <label htmlFor="coverImageUrl">Cover image</label>
      <input type="hidden" name="coverImageUrl" ref={register} className="mb-2" value={imageUrl} />
      <FormValidationErrorMsg errorMessage={errors.coverImageUrl?.message} />
      {/* Thumbnail preview */}
      {imageUrl && thumbnailPreview}
      <CloudinaryUploadWidget exposeImageData={grabImageData} />

      <Input label="Start time" type="datetime-local" name="startTime" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.startTime?.message} />

      <Input label="End time" type="datetime-local" name="endTime" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.endTime?.message} />

      <Select label="Meet region" name="region" ref={register} options={regionOptions} />
      <FormValidationErrorMsg errorMessage={errors.region?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
