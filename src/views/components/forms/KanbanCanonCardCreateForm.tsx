import React, { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MarkdownEditor } from "../MarkdownEditor";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { Input } from "../blocks/Form/Input";

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
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Create a new kanban card</H2>

      {/* Infer kanbanCanonId without prompting */}
      <input type="hidden" name="kanbanCanonId" ref={register} value={kanbanCanonId} />

      <Input label="Title" name="title" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <label htmlFor="body">Body</label>
      <MarkdownEditor value={body} onChange={(value) => setValue("body", value)} />
      <FormValidationErrorMsg errorMessage={errors.body?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
