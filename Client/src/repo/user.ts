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

export interface UserDetails {
  username: string;
  name: string;
  image?: string;
  location?: string;
  website?: string;
  bio?: string;
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

// TODO: GET
// fetch users from GET /user

export const GET_DETAILS = async (token: string, username: string) => {
  const response = await fetch(`${endpoint}/user/${username}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const details: UserDetails = await response.json();
  return details;
};
