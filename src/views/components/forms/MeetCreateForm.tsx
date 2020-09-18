import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const CreateMeetInputSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  meetType: Yup.string().required("Required"),
  title: Yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: Yup.string().min(3, "Too Short!").required("Required"),
  instructions: Yup.string().min(3, "Too Short!").required("Required"),
  registerLink: Yup.string().required("Required"),
  coverImageUrl: Yup.string().required("Required"),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  region: Yup.string().required("Required"),
});

interface Props {
  createMeet: (values: CreateMeetParams) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const MeetCreateForm: FC<Props> = ({ createMeet, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(CreateMeetInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetParams) => createMeet(data);

  // Form TODO:
  // - instructions: add markdown editor
  // - coverImageUrl: use cloudinary widget, convert to url before submit
  // - starttime/endtime : convert to timestamp before submit

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Login</h1>

      <label htmlFor="meetType">Event type</label>
      <select name="meetType" ref={register}>
        <option value="hackMeet" selected>
          Hackathon
        </option>
      </select>
      <p className="text-red-500">{errors.meetType?.message}</p>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} />
      <p className="text-red-500">{errors.title?.message}</p>

      <label htmlFor="description">Description</label>
      <textarea name="description" ref={register} />
      <p className="text-red-500">{errors.description?.message}</p>

      <label htmlFor="description">Intructions</label>
      <textarea name="description" ref={register} />
      <p className="text-red-500">{errors.description?.message}</p>

      <label htmlFor="registerLink">Registration link</label>
      <input type="url" name="registerLink" ref={register} />
      <p className="text-red-500">{errors.registerLink?.message}</p>

      <label htmlFor="coverImageUrl">Cover image link {/*TODO: cloudinary*/}</label>
      <input type="url" name="coverImageUrl" ref={register} />
      <p className="text-red-500">{errors.coverImageUrl?.message}</p>

      <label htmlFor="startTime">Start time</label>
      <input type="datetime-local" name="startTime" ref={register} />
      <p className="text-red-500">{errors.startTime?.message}</p>

      <label htmlFor="endTime">End time</label>
      <input type="datetime-local" name="endTime" ref={register} />
      <p className="text-red-500">{errors.endTime?.message}</p>

      <label htmlFor="region">Event type</label>
      <select name="region" ref={register}>
        <option value="America/Toronto" selected>
          Toronto
        </option>
      </select>
      <p className="text-red-500">{errors.region?.message}</p>
    </form>
  );
};
