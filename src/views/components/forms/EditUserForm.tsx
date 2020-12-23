import React, { FC, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../blocks/Form/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { FormValidationErrorMsg } from "../blocks/Form/FormValidationErrorMsg";
import { Button } from "../blocks/Button";
import { Context } from "../../../context/contextBuilder";
import { MbContext } from "../../../context/MbContext";
import { useHistory } from "react-router-dom";

interface Props {
  user: User;
}

const editUserInputSchema = yup.object().shape({
  firstName: yup.string().min(1, "First name is too short!").max(32, "First name can be a maximum of 32 characters!"),
  lastName: yup.string().min(1, "Last name is too short!").max(32, "Last name can be a maximum of 32 characters!"),
});

const EditUserForm: FC<Props> = ({ user }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const context = useContext<Context>(MbContext);
  const history = useHistory();

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(editUserInputSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  const availableInputOptions = [
    { name: "firstName", label: "First name: ", defaultValue: user.firstName },
    { name: "lastName", label: "Last name: ", defaultValue: user.lastName },
  ];

  const editUser = async (params: EditUserInput) => {
    await context.authDao.editUser(user.id, params);
    history.push("/profile");
  };

  const onSubmit = (data: EditUserInput) => {
    editUser(data);
  };

  return (
    <form ref={formRef} className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {availableInputOptions.map(({ name, label, defaultValue }, index) => (
        <fieldset className="flex flex-col" key={index}>
          <Input ref={register} name={name} label={label} defaultValue={defaultValue} />
          <FormValidationErrorMsg errorMessage={errors[name]?.message} />
        </fieldset>
      ))}
      <Button buttonStyle="primaryAdmin" type="submit">
        Edit user details
      </Button>
    </form>
  );
};

export default EditUserForm;
