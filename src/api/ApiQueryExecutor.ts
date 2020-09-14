import axios from "axios";

export class ApiQueryExecutor {
  query<R, V = void>(query: string, variables?: V): Promise<R> {
    const url = "/graphql";
    const data = {
      query,
      variables,
    };
    const config = {
      withCredentials: true,
    };
    return axios.post(url, data, config).then((res) => res.data);
  }
}
