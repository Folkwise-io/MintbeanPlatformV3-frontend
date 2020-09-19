import * as Yup from "yup";

/* TODO: Consolidate Yup schemas in backend */
const ServerErrorSchema = Yup.object().shape({
  message: Yup.string().required(),
  extensions: Yup.object().shape({
    code: Yup.string().required(),
  }),
});
const ServerErrorArraySchema = Yup.array().of(ServerErrorSchema);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isServerError = (tbd: any): boolean => {
  return ServerErrorSchema.isValidSync(tbd);
};
export const isServerErrorArray = (tbd: any): boolean => {
  return ServerErrorArraySchema.isValidSync(tbd);
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
