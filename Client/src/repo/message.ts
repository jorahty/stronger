import endpoint from './endpoint';

export interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  date: string;
}

export const GET = async (token: string, username: string) => {
  const response = await fetch(`${endpoint}/message/${username}`, {
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
