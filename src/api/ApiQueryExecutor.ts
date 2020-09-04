import axios from "axios";

// interface ApiQueryResult<T> {
//   success: boolean;
//   payload: T;
//   failureType?: "INTERNAL_SERVER_ERROR" | "AUTH";
// }

export class ApiQueryExecutor {
  query<R, V = void>(query: string, variables?: V): Promise<R> {
    return axios({
      url: "http://localhost:4000/graphql",
      method: "post",
      data: {
        query,
        variables,
      },
    }).then((res) => {
      console.log(res);
      return res.data.data;
    });
  }
}
