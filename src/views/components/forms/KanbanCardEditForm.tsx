import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "../MarkdownEditor";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createKanbanCardInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  body: yup.string().min(3, "Too Short!").required("Required"),
});

interface Props {
  data: KanbanCard;
  editKanbanCard: (input: EditKanbanCardInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const KanbanCardEditForm: FC<Props> = ({ data, editKanbanCard, formRef }) => {
  const { errors, register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(createKanbanCardInputSchema),
    defaultValues: {
      kanbanId: data.kanbanId,
      title: data.title,
      body: data.body,
    },
  });

  useEffect(() => {
    register({ name: "body" });
  }, [register]);

  const body = watch("body");

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (input: CreateKanbanCardInput) => {
    editKanbanCard(input);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-semibold">Create a new kanban card</h1>

      {/* Infer kanbanId without prompting */}
      <input type="hidden" name="kanbanId" ref={register} value={data.kanbanId} />

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
