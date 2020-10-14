import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const editKanbanInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(150, "Too Long!").required("Required"),
});

interface Props {
  editKanban: (values: EditKanbanInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
  kanban: Kanban;
}

export const KanbanEditForm: FC<Props> = ({ editKanban, formRef, kanban }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(editKanbanInputSchema),
    defaultValues: {
      title: kanban.title,
      description: kanban.description,
    },
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetParams) => {
    editKanban(data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Edit this kanban</h1>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.title?.message}</p>

      <label htmlFor="description">Description</label>
      <textarea name="description" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.description?.message}</p>

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
