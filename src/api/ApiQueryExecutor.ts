import axios from "axios";

export class ApiQueryExecutor {
  query<R, V = void>(query: string, variables?: V): Promise<R> {
    return axios({
      url: "http://localhost:4000/graphql",
      method: "post",
      data: {
        query,
        variables,
      },
      // withCredentials: true,
    }).then((res) => res.data); // returns object with shape { data, errors? }
  }
}
