import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "../MarkdownEditor";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createKanbanCardInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  body: yup.string().min(3, "Too Short!").required("Required"),
});

interface Props {
  kanbanId: string;
  createKanbanCard: (values: CreateKanbanCardInput) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

export const KanbanCardCreateForm: FC<Props> = ({ kanbanId, createKanbanCard, formRef }) => {
  const { errors, register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(createKanbanCardInputSchema),
  });

  useEffect(() => {
    register({ name: "body" });
  }, [register]);

  const body = watch("body");

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (input: CreateKanbanCardInput) => {
    createKanbanCard(input);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Create a new kanban card</H2>

      {/* Infer kanbanId without prompting */}
      <input type="hidden" name="kanbanId" ref={register} value={kanbanId} />

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} className="mb-2" />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <label htmlFor="body">Body</label>
      <MarkdownEditor value={body} onBeforeChange={(value) => setValue("body", value)} />
      <FormValidationErrorMsg errorMessage={errors.body?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
