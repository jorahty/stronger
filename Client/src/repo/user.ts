import * as FileSystem from 'expo-file-system';

import { apiEndpoint } from './endpoint';
import { Platform } from 'react-native';

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
  { imageUri, name, location, website, bio }: NewUserDetails
) => {
  const formData = new FormData();

  if (imageUri) {
    if (Platform.OS === 'web') {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      formData.append('imageFile', blob);
    } else {
      var blob = {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'blob.jpg',
      };
      formData.append('imageFile', blob as any);
    }
  }

  formData.append('name', name);
  formData.append('location', location);
  formData.append('website', website);
  formData.append('bio', bio);

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
