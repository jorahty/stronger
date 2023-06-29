import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LOGIN, LoginResponse } from '../repo/user';
import { GET as GET_POSTINGS, Posting } from '../repo/posting';

const ViewModelContext = createContext<any>(null);

export function useViewModel() {
  return useContext(ViewModelContext);
}

interface Props {
  children: ReactNode;
}

export default function ViewModel({ children }: Props) {
  const [error, setError] = useState<null | string>();
  const [loginResponse, setLoginResponse] = useState<null | LoginResponse>();
  const [postings, setPostings] = useState<Posting[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      setPostings([]);
      setPostings(await GET_POSTINGS(loginResponse!.accessToken));
    };
    if (loginResponse) {
      fetchData();
    }
  }, [loginResponse]);

  return (
    <ViewModelContext.Provider
      value={{ error, loginResponse, login, logout, postings }}>
      {children}
    </ViewModelContext.Provider>
  );
}
