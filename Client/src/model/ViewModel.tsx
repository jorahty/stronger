import { ReactNode, createContext, useContext, useState } from 'react';

const ViewModelContext = createContext<any>(null);

export function useViewModel() {
  return useContext(ViewModelContext);
}

interface Props {
  children: ReactNode;
}

export default function ViewModel({ children }: Props) {
  const [error, setError] = useState();
  const [loginResponse, setLoginResponse] = useState<null | string>();

  const login = () => {
    setLoginResponse('kyle');
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
