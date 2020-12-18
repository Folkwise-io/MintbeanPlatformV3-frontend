import React, { FC } from "react";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Form } from "../blocks/Form";
import { Input } from "../blocks/Form/Input";
import { TextArea } from "../blocks/Form/TextArea";
import { Button } from "../blocks/Button";

/* TODO: CENTRALIZE & SYNC YUP SCHEMAS IN BACKEND*/
const partnerContactEmailInputSchema = yup.object().shape({
  fullName: yup.string().min(1, "At least one character!").max(64, "Maximum 36 characters!").required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  partnershipGoals: yup.array().min(1, "Must indicate at least one!").required(), // requires at least one checkbox checked
  message: yup.string().min(1, "Please enter a message").required("Required"),
});

type Props = {
  handleData: (values: PartnerContactFormInput) => void;
  disabled: boolean;
};

export const PartnerContactForm: FC<Props> = ({ handleData, disabled }) => {
  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(partnerContactEmailInputSchema),
  });

  const buttonText = disabled ? "Sending..." : "Get in touch";

  // RHF only calls onSubmit callback when form input passes validation
  const onSubmit = (data: PartnerContactFormInput) => handleData(data);
  const options = [
    { label: "Brand Visibility", value: "Brand Visibility" },
    { label: "Thought Leadership", value: "Thought Leadership" },
    { label: "Talent Recruitment", value: "Talent Recruitment" },
  ];
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex ">
        <div className="mx-2 flex flex-grow flex-col items-start">
          <Input label="Full name" name="fullName" ref={register} isRequired className="w-full" />
          <FormValidationErrorMsg errorMessage={errors.fullName?.message} withBackground />
        </div>

        <div className="mx-2 flex flex-grow flex-col items-start">
          <Input type="email" label="Email" name="email" ref={register} isRequired className="w-full" />
          <FormValidationErrorMsg errorMessage={errors.email?.message} withBackground />
        </div>
      </div>

      {/* Attempted to refactor fieldset to a separate component but was unable to TS resolve nested ref={register} */}
      <fieldset className="flex">
        <legend>
          <strong>Partnership goals*</strong>
          <em> (select all that apply)</em>
        </legend>

        {options.map(({ value, label }, i) => (
          <label key={i} className="flex flex-col items-center">
            <input type="checkbox" value={value} name="partnershipGoals" ref={register} />
            {label}
          </label>
        ))}
      </fieldset>
      <FormValidationErrorMsg errorMessage={errors.partnershipGoals?.message} withBackground />

      <div className="mx-2 flex flex-col items-start">
        <TextArea label="Message" name="message" ref={register} isRequired className="w-full" />
        <FormValidationErrorMsg errorMessage={errors.message?.message} withBackground />
      </div>

      <Button type="submit" disabled={disabled}>
        {buttonText}
      </Button>
    </Form>
  );
};
