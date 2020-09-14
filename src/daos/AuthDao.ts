export interface AuthDao {
  login(params: LoginInput): Promise<User>;
  logout(): Promise<boolean>;
  me(): Promise<User>;
  register(params: RegisterInput): Promise<User>;
}
