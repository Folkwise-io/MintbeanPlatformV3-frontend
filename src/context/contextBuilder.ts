interface Context {
  foo: string;
}

export const contextBuilder = (): Context => {
  const dao = new UserDao();
};
