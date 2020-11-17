import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createKanbanInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(150, "Too Long!").required("Required"),
});

interface Props {
  createKanban: (values: CreateKanbanInput) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

export const KanbanCreateForm: FC<Props> = ({ createKanban, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(createKanbanInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetParams) => {
    createKanban(data);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Create a new kanban</H2>

      <label htmlFor="title">Title</label>
      <input type="text" name="title" ref={register} className="mb-2" />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <label htmlFor="description">Description</label>
      <textarea name="description" ref={register} className="mb-2" />
      <FormValidationErrorMsg errorMessage={errors.description?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
