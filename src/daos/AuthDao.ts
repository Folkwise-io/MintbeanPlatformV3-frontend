import { UserForProfile } from "../types/user";

export interface AuthDao {
  login(args: LoginArgs): Promise<User>;
  logout(): Promise<boolean>;
  me(): Promise<UserForProfile>;
  register(input: RegisterInput): Promise<User>;
  editUser(id: string, input: EditUserInput): Promise<User>;
}
