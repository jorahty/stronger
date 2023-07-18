import { apiEndpoint } from './endpoint';

export interface User {
  username: string;
  name: string;
  image: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface UserDetails {
  username: string;
  name: string;
  image: string;
  location: string;
  website: string;
  bio: string;
}

export interface NewUserDetails {
  imageUri?: string;
  name: string;
  location: string;
  website: string;
  bio: string;
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

export const UPDATE_DETAILS = async (
  token: string,
  newUserDetails: NewUserDetails
) => {
  const formData = new FormData();

  if (newUserDetails.imageUri) {
    const response = await fetch(newUserDetails.imageUri);
    const blob = await response.blob();
    formData.append('imageFile', blob);
  }

  formData.append('name', newUserDetails.name);
  formData.append('location', newUserDetails.location);
  formData.append('website', newUserDetails.website);
  formData.append('bio', newUserDetails.bio);

  const res = await fetch(`${apiEndpoint}/user`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const details: UserDetails = await res.json();
  return details;
};

export const GET_CHATS = async (token: string) => {
  const response = await fetch(`${apiEndpoint}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const chats: User[] = await response.json();
  return chats;
};
