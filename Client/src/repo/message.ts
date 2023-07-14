import { apiEndpoint } from './endpoint';

export interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  date: string;
}

interface NewMessage {
  content: string;
}

export const GET = async (token: string, username: string) => {
  const response = await fetch(`${apiEndpoint}/message/${username}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const messages: Message[] = await response.json();
  return messages.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export const CREATE = async (
  token: string,
  username: string,
  newMessage: NewMessage
) => {
  const response = await fetch(`${apiEndpoint}/message/${username}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  });
  const message = await response.json();
  return message;
};
