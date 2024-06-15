interface IUserInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type InputsUser = 'username' | 'email' | 'password' | 'confirmPassword';

interface IUserLogin {
  email: string;
  password: string;
}

type Roles = 'admin' | 'user';

interface IUserDataContext {
  id: number;
  username: string;
  auth: boolean;
  isLogged: boolean;
  token: string | null;
  role: Roles | undefined;
}

interface IUserContext {
  user: IUserDataContext;
  updateUser: (newUser: IUserDataContext) => void;
  logoutUser: () => void;
}
