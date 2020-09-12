export interface AuthDao {
  login(credentials: LoginInput): Promise<User | void>;
}
