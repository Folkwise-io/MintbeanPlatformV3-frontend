import axios from "axios";

export class ApiQueryExecutor {
  query<T>(query: string, variables: any = {}): Promise<T> {
    return axios({
      url: "http://localhost:4000/graphql",
      method: "post",
      data: {
        query,
        variables,
      },
    }).then((res) => res.data.data);
  }
}
