import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "../MarkdownEditor";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const editKanbanCanonInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!"),
  description: yup.string().min(3, "Too Short!").max(150, "Too Long!"),
});

interface Props {
  data: KanbanCanonCard;
  editCanonCanonCard: (input: EditKanbanCanonCardInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const KanbanCanonCardEditForm: FC<Props> = ({ data, editCanonCanonCard, formRef }) => {
  const { errors, register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(editKanbanCanonInputSchema),
    defaultValues: {
      title: data.title,
      body: data.body,
    },
  });

  useEffect(() => {
    register({ name: "body" });
  }, [register]);

  const body = watch("body");

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (input: CreateKanbanCanonCardInput) => {
    editCanonCanonCard(input);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Create a new kanban card</h1>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} className="mb-2" />
      <p className="text-red-500">{errors.title?.message}</p>

      <label htmlFor="body">Body</label>
      <MarkdownEditor value={body} onBeforeChange={(value) => setValue("body", value)} />
      <p className="text-red-500">{errors.body?.message}</p>

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </form>
  );
};
