import axios /*, { AxiosPromise }*/ from "axios";

// TODO: dynamically populate url with environment variable (dev/prod)
export function gqlApiService<ResponseT>(url: string, query: string, variables: any = {}): Promise<ResponseT> {
  return axios({
    url,
    method: "post",
    data: {
      query,
      variables,
    },
  }).then((res) => res.data.data);
}
