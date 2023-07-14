import endpoint from './endpoint';

export interface User {
  username: string;
  name: string;
  image?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export const LOGIN = async (username: string, password: string) => {
  const response = await fetch(`${endpoint}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  return data;
};
