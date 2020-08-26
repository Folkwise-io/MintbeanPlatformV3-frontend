import axios, { AxiosPromise } from "axios";

export function gqlApiService<T>(url: string, query: string, variables: object = {}): AxiosPromise<T> {
  return axios({
    url,
    method: "post",
    data: {
      query,
      variables,
    },
  });
}
