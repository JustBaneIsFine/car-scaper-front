import { createContext, useState } from 'react';
import {
  UserStateInterface,
  ProviderChildProps,
  UserContextType,
} from '../interfaces/StateInterfaces';

const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: ProviderChildProps) {
  const [userState, setUser] = useState({} as UserStateInterface);

  function setUserState(
    username: string,
    userLogedIn: boolean,
    userEmail: string
  ) {
    const x = {} as UserStateInterface;
    x.username = username;
    x.userLogedIn = userLogedIn;
    x.userEmail = userEmail;
    setUser(x);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
