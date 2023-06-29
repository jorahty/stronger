import { ReactNode, createContext, useContext, useState } from 'react';

import { LOGIN } from '../repo/member';

const ViewModelContext = createContext<any>(null);

export function useViewModel() {
  return useContext(ViewModelContext);
}

interface Props {
  children: ReactNode;
}

export default function ViewModel({ children }: Props) {
  const [error, setError] = useState<null | string>();
  const [loginResponse, setLoginResponse] = useState<null | string>();

  const login = (username: string, password: string) => {
    LOGIN(username, password)
      .then((response) => {
        setLoginResponse(response);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logout = () => {
    setLoginResponse(null);
  };

  return (
    <ViewModelContext.Provider value={{ error, loginResponse, login, logout }}>
      {children}
    </ViewModelContext.Provider>
  );
}
