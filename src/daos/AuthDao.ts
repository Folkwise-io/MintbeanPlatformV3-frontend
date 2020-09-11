export interface AuthDao {
  login(credentials: LoginInput): Promise<User | undefined | void>;
}
