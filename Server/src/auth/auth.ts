import { User } from '../user/user';

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface JwtPayload {
  username: string;
  name: string;
  scopes: string[];
}
