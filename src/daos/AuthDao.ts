export interface AuthDao {
  login(): Promise<User>;
}
