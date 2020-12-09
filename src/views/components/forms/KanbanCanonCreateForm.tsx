import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { Input } from "../blocks/Form/Input";
import { CreateMeetInput } from "../../../types/meet";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const createKanbanCanonInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(150, "Too Long!").required("Required"),
});

interface Props {
  createKanbanCanon: (values: CreateKanbanCanonInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export const KanbanCanonCreateForm: FC<Props> = ({ createKanbanCanon, formRef }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(createKanbanCanonInputSchema),
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetInput) => {
    createKanbanCanon(data);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Create a new kanban</H2>

      <Input label="Title" name="title" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <Input label="Description" name="description" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.description?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
