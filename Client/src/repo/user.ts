import { apiEndpoint } from './endpoint';

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
  const response = await fetch(`${apiEndpoint}/login`, {
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
  const response = await fetch(`${apiEndpoint}/user/${username}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const details: UserDetails = await response.json();
  return details;
};

export const UPDATE_DETAILS = async (token: string, imageUri: string) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append('image', blob, 'pfp.png');
  formData.append('name', 'James Tennant');
  formData.append('location', 'Berkeley, CA');
  formData.append('website', 'https://jorahty.com');
  formData.append('bio', ':)');

  await fetch(`${apiEndpoint}/user`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};
