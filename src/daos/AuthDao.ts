export interface AuthDao {
  login(params: LoginParams): Promise<User>;
  logout(): Promise<boolean>;
  me(): Promise<User>;
  register(params: RegisterParams): Promise<User>;
}
