import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LOGIN, LoginResponse, User } from '../repo/user';
import {
  Posting,
  GET as GET_POSTINGS,
  CREATE as CREATE_POSTING,
  DELETE as DELETE_POSTING,
} from '../repo/posting';
import {
  Message,
  GET as GET_MESSAGES,
  CREATE as CREATE_MESSAGE,
} from '../repo/message';

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
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [messages, setMessages] = useState<Message[]>([]);

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

  const createPosting = async (content: string) => {
    const posting = await CREATE_POSTING(loginResponse!.accessToken, {
      content,
    });
    setPostings([posting, ...postings]);
  };

  const deletePosting = async (id: string) => {
    await DELETE_POSTING(loginResponse!.accessToken, id);
    setPostings(postings.filter((posting) => posting.id !== id));
  };

  const selectUser = async (user: User) => {
    setSelectedUser(user);
    setMessages([]);
    // setProfile(null);
    setMessages(await GET_MESSAGES(loginResponse!.accessToken, user.username));
    // setProfile(GET);
  };

  const createMessage = async (content: string) => {
    const message = await CREATE_MESSAGE(
      loginResponse!.accessToken,
      selectedUser!.username,
      {
        content,
      }
    );
    setMessages([...messages, message]);
  };

  return (
    <ViewModelContext.Provider
      value={{
        error,
        loginResponse,
        login,
        logout,
        postings,
        createPosting,
        deletePosting,
        selectedUser,
        selectUser,
        messages,
        createMessage,
      }}>
      {children}
    </ViewModelContext.Provider>
  );
}
