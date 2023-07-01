import endpoint from './endpoint';
import { User } from './user';

export interface Posting {
  id: string;
  poster: User;
  content: string;
  date: string;
}

export interface NewPosting {
  content: string;
}

export const GET = async (token: string) => {
  const response = await fetch(`${endpoint}/posting`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const postings: Posting[] = await response.json();
  return postings.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const CREATE = async (token: string, newPosting: NewPosting) => {
  const response = await fetch(`${endpoint}/posting`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPosting),
  });
  const posting = await response.json();
  return posting;
};

export const DELETE = async (token: string, id: string) => {
  await fetch(`${endpoint}/posting/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
