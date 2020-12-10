import React, { FC } from "react";
import { Input } from "../blocks/Form/Input";

interface Props {
  user: User;
}

const EditUserForm: FC<Props> = ({ user }) => {
  return (
    <form className="grid grid-cols-2" action="">
      <p className="place-self-center">{user.firstName}</p>
      <fieldset>
        <Input label="First name: " name="firstName" />
      </fieldset>
      <p className="place-self-center">{user.lastName}</p>
      <fieldset>
        <Input label="Last name: " name="lastName" />
      </fieldset>
    </form>
  );
};

export default EditUserForm;
