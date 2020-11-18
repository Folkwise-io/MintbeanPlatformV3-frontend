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
const createKanbanCardInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  body: yup.string().min(3, "Too Short!").required("Required"),
});

interface Props {
  data: KanbanCard;
  editKanbanCard: (input: EditKanbanCardInput) => void;
  formRef: React.RefObject<HTMLFormElement>;
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
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Create a new kanban card</H2>

      {/* Infer kanbanId without prompting */}
      <input type="hidden" name="kanbanId" ref={register} value={data.kanbanId} />

      <Input label="Title" name="title" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <label htmlFor="body">Body</label>
      <MarkdownEditor value={body} onBeforeChange={(value) => setValue("body", value)} />
      <FormValidationErrorMsg errorMessage={errors.body?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
