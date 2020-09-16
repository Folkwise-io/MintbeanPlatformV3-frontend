// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";

/* TODO: consider refactoring User attributes query into a resuable function */
export class AuthDaoImpl implements AuthDao {
  constructor(private api: ApiQueryExecutor) {}

  login(loginInput: LoginInput): Promise<User> {
    return (
      this.api
        .query<ApiResponseRaw<{ login: User }>, LoginInput>(
          `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                id
                email
                username
                firstName
                lastName
                createdAt
              }
            }
          `,
          loginInput,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.login) {
            throw [{ message: "Failed to log in", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.login;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (e.errors) {
            throw e.errors;
          } else {
            throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
          }
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }

  logout(): Promise<boolean> {
    return (
      this.api
        .query<ApiResponseRaw<{ logout: boolean }>, LoginInput>(
          `
            mutation logout {
              logout
            }
          `,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.logout) {
            throw [{ message: "Failed to logout", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.logout;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (e.errors) {
            throw e.errors;
          } else {
            throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
          }
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }

  me(): Promise<User> {
    return (
      this.api
        .query<ApiResponseRaw<{ me: User }>, LoginInput>(
          `
            query me {
              me {
                id
                email
                username
                firstName
                lastName
                createdAt
              }
            }
          `,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.me) {
            throw [{ message: "Failed to fetch current user", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.me;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (e.errors) {
            throw e.errors;
          } else {
            throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
          }
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
