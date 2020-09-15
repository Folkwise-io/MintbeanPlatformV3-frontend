export interface AuthDao {
  login(credentials: LoginInput): Promise<User>;
  logout(): Promise<boolean>;
  me(): Promise<User>;
}
