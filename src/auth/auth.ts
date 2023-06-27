export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  accessToken: string;
}

export interface JwtPayload {
  username: string;
  name: string;
  scopes: string[];
}
