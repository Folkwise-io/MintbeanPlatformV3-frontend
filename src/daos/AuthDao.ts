export interface AuthDao {
  login(args: LoginArgs): Promise<User>;
  logout(): Promise<boolean>;
  me(): Promise<User>;
  register(input: RegisterInput): Promise<User>;
}
