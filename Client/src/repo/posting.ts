import endpoint from './endpoint';
import { User } from './user';

export interface Posting {
  id: string;
  poster: User;
  content: string;
  date: string;
}

export const GET = async (token: string) => {
  const response = await fetch(`${endpoint}/posting`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
