import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "../blocks/Form";
import { H2 } from "../blocks/H2";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Input } from "../blocks/Form/Input";
import { TextArea } from "../blocks/Form/TextArea";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const editKanbanInputSchema = yup.object().shape({
  title: yup.string().min(2, "Too Short!").max(64, "Too Long!").required("Required"),
  description: yup.string().min(3, "Too Short!").max(150, "Too Long!").required("Required"),
});

interface Props {
  editKanbanCanon: (values: EditKanbanCanonInput) => void;
  formRef: React.RefObject<HTMLFormElement> | null;
  kanbanCanon: KanbanCanon;
}

export const KanbanCanonEditForm: FC<Props> = ({ editKanbanCanon, formRef, kanbanCanon }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(editKanbanInputSchema),
    defaultValues: {
      title: kanbanCanon.title,
      description: kanbanCanon.description,
    },
  });

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: CreateMeetInput) => {
    editKanbanCanon(data);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <H2>Edit this kanban canon</H2>

      <Input label="Title" name="title" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.title?.message} />

      <TextArea label="Description" name="description" ref={register} />
      <FormValidationErrorMsg errorMessage={errors.description?.message} />

      {/* workaround for allowing form submit on Enter */}
      <input type="submit" className="hidden" />
    </Form>
  );
};
