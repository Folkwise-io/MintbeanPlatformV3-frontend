import * as Yup from "yup";

const ServerErrorSchema = Yup.object().shape({
  message: Yup.string().required(),
  extensions: Yup.object().shape({
    code: Yup.string().required(),
  }),
});
const ServerErrorArraySchema = Yup.array().of(ServerErrorSchema);

/* TODO: centralize schema validations */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isServerError = (tbd: any) => {
  return ServerErrorSchema.isValidSync(tbd);
};
export const isServerErrorArray = (tbd: any) => {
  return ServerErrorArraySchema.isValidSync(tbd);
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
