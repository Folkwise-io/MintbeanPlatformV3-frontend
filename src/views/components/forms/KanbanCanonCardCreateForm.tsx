import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "../MarkdownEditor";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createKanbanCanonCardInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  body: yup.string().min(3, "Too Short!").required("Required"),
});

interface Props {
  kanbanCanonId: string;
  createKanbanCanonCard: (values: CreateKanbanCanonCardInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const KanbanCanonCardCreateForm: FC<Props> = ({ kanbanCanonId, createKanbanCanonCard, formRef }) => {
  const { errors, register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(createKanbanCanonCardInputSchema),
  });

  useEffect(() => {
    register({ name: "body" });
  }, [register]);

  const body = watch("body");

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (input: CreateKanbanCanonCardInput) => {
    createKanbanCanonCard(input);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}>
      <h1 className="font-semibold">Create a new kanban canon card</h1>

      {/* Infer kanbanCanonId without prompting */}
      <input type="hidden" name="kanbanCanonId" ref={register} value={kanbanCanonId} />

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
