import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  LoginResponse,
  User,
  UserDetails,
  NewUserDetails,
  LOGIN,
  GET_DETAILS as GET_USER_DETAILS,
  UPDATE_DETAILS as UPDATE_USER_DETAILS,
  GET_CHATS,
} from '../repo/user';
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

const ViewModelContext = createContext<any>({});

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
  const [chats, setChats] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<null | UserDetails>(null);

  const login = async (username: string, password: string) => {
    LOGIN(username, password)
      .then((response) => {
        setLoginResponse(response);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logout = async () => {
    setLoginResponse(null);
  };

  const getPostings = async () => {
    setPostings(await GET_POSTINGS(loginResponse!.accessToken));
  };

  useEffect(() => {
    if (loginResponse) {
      getPostings();
      getChats();
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
    setSelectedUserDetails(null);
    setMessages(await GET_MESSAGES(loginResponse!.accessToken, user.username));
    setSelectedUserDetails(
      await GET_USER_DETAILS(loginResponse!.accessToken, user.username)
    );
  };

  const getMessages = async () => {
    setMessages(
      await GET_MESSAGES(loginResponse!.accessToken, selectedUser!.username)
    );
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

  const getChats = async () => {
    setChats(await GET_CHATS(loginResponse!.accessToken));
  };

  const updateUserDetails = async (newUserDetials: NewUserDetails) => {
    setSelectedUserDetails(
      await UPDATE_USER_DETAILS(loginResponse!.accessToken, newUserDetials)
    );
  };

  return (
    <ViewModelContext.Provider
      value={{
        error,
        loginResponse,
        login,
        logout,
        getPostings,
        postings,
        createPosting,
        deletePosting,
        selectedUser,
        selectUser,
        messages,
        createMessage,
        getMessages,
        selectedUserDetails,
        updateUserDetails,
        getChats,
        chats,
      }}>
      {children}
    </ViewModelContext.Provider>
  );
}
