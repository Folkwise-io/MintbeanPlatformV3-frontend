import axios, { AxiosPromise } from "axios";

// TODO: dynamically populate url with environment variable (dev/prod)
export function gqlApiService<T>(url: string, query: string, variables: any = {}): AxiosPromise<T> {
  return axios({
    url,
    method: "post",
    data: {
      query,
      variables,
    },
  });
}
