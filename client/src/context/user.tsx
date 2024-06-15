import { ReactNode, createContext, useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

interface IPropsUserContenxt {
  children: ReactNode;
}
interface JwtPayload {
  username: string;
  id: number;
  role: Roles;
}

export const UserContext = createContext<IUserContext | null>(null);

export default function UserProvider(props: IPropsUserContenxt) {
  const [user, setUser] = useState<IUserDataContext>({
    auth: false,
    username: 'Visitante',
    isLogged: false,
    token: null,
    id: NaN,
    role: undefined,
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('USER_TOKEN');
      if (token) {
        const tokenDecoded = jwtDecode(token) as JwtPayload;
        const { username, id, role } = tokenDecoded;
        console.log(tokenDecoded)
        setUser({
          auth: true,
          username,
          isLogged: true,
          token,
          id: Number(id),
          role,
        });
      }
    };
    verifyToken();
  }, []);

  const handleUpdateUser = (newUser: IUserDataContext) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser({
      auth: false,
      username: 'Visitante',
      isLogged: false,
      token: null,
      id: NaN,
      role: undefined,
    });
    localStorage.remove('USER_TOKEN');
  };

  const { children } = props;

  return (
    <UserContext.Provider
      value={{ user, updateUser: handleUpdateUser, logoutUser: handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}
