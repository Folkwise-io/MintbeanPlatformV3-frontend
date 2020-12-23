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
  fullName: yup.string().min(1, "Please let us know your name").max(64, "Maximum 36 characters!").required("Required"),
  email: yup.string().email("Invalid email").required("Email required"),
  partnershipGoals: yup.array().min(1, "Please indicate at least one goal").required(), // requires at least one checkbox checked
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
      <div className="flex sm:flex-row flex-col">
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
      <fieldset className="flex text-left mx-2">
        <legend>
          <strong>Partnership goals*</strong>
          <em> (select all that apply)</em>
        </legend>
        <div className="flex sm:justify-start my-2 flex-wrap">
          {options.map(({ value, label }, i) => (
            <label key={i} className="flex flex-col items-center text-center p-2 text-sm" style={{ maxWidth: "100px" }}>
              <input type="checkbox" value={value} name="partnershipGoals" ref={register} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <FormValidationErrorMsg errorMessage={errors.partnershipGoals?.message} withBackground />

      <div className="mx-2 flex flex-col items-start">
        <TextArea label="Message" name="message" ref={register} isRequired className="w-full" />
        <FormValidationErrorMsg errorMessage={errors.message?.message} withBackground />
      </div>
      <div className="flex justify-center">
        <Button type="submit" disabled={disabled} className="max-w-sm mt-6">
          {buttonText}
        </Button>
      </div>
    </Form>
  );
};
