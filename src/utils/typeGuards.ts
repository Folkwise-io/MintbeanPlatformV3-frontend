import * as yup from "yup";

/* TODO: Consolidate yup schemas in backend */
const serverErrorSchema = yup.object().shape({
  message: yup.string().required(),
  extensions: yup.object().shape({
    code: yup.string().required(),
  }),
});
const serverErrorArraySchema = yup.array().of(serverErrorSchema);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isServerError = (tbd: any): boolean => {
  return serverErrorSchema.isValidSync(tbd);
};
export const isServerErrorArray = (tbd: any): boolean => {
  return serverErrorArraySchema.isValidSync(tbd);
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
