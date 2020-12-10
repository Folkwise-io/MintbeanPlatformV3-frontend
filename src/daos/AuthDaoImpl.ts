// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";
import { handleServerError } from "../utils/handleServerError";
import { UserForProfile } from "../types/user";

/* TODO: consider refactoring User attributes query into a resuable function */
export class AuthDaoImpl implements AuthDao {
  constructor(private api: ApiQueryExecutor) {}

  login(params: LoginArgs): Promise<User> {
    return this.api
      .query<ApiResponseRaw<{ login: User }>, LoginArgs>(
        `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                id
                email
                firstName
                lastName
                createdAt
                isAdmin
              }
            }
          `,
        params,
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.login) {
          throw [{ message: "Failed to log in", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.login;
      })
      .catch(handleServerError);
  }

  logout(): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ logout: boolean }>>(
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
      .catch(handleServerError);
  }

  me(): Promise<UserForProfile> {
    return this.api
      .query<ApiResponseRaw<{ me: UserForProfile }>>(
        `
            query me {
              me {
                id
                email
                firstName
                lastName
                createdAt
                isAdmin
                registeredMeets {
                  id
                  title
                  registerLinkStatus
                }
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
      .catch(handleServerError);
  }

  register(input: RegisterInput): Promise<User> {
    return this.api
      .query<ApiResponseRaw<{ register: User }>, { input: RegisterInput }>(
        `
        mutation register($input: UserRegistrationInput!) {
          register(input: $input) {
            id
            email
            firstName
            lastName
            createdAt
            isAdmin
          }
        }
        `,
        { input },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.register) {
          throw [{ message: "Failed to register new user.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.register;
      })
      .catch(handleServerError);
  }

  editUser(id: string, input: EditUserInput): Promise<User> {
    return this.api
      .query<ApiResponseRaw<{ editUser: User }>, { id: string; input: EditUserInput }>(
        `
      mutation editUser($id: UUID!, $input: EditUserInput!) {
        editUser(id: $id, input: $input) {
          firstName
          lastName
          email
        }
      }
      `,
        { id, input },
      )
      .then(({ data, errors }) => {
        if (errors) throw errors;
        if (!errors && !data.editUser) {
          throw [{ message: "Failed to edit user.", extensions: { code: "UNEXPECTED" } }];
        }
        return data.editUser;
      });
  }
}
