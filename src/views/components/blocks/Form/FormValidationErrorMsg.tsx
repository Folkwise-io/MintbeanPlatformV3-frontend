import React, { FC } from "react";

interface Props {
  errorMessage?: string;
}
export const FormValidationErrorMsg: FC<Props> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <p className="text-red-500">{errorMessage}</p>;
};
