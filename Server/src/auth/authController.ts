import { Body, Controller, Post, Response, Route } from 'tsoa';

import { Credentials, LoginResponse } from './auth';
import { AuthService } from './authService';

@Route('login')
export class AuthController extends Controller {
  @Post()
  @Response('401', 'Unauthorized')
  public async login(
    @Body() credentials: Credentials
  ): Promise<LoginResponse | undefined> {
    return new AuthService()
      .login(credentials)
      .then(
        async (
          user: LoginResponse | undefined
        ): Promise<LoginResponse | undefined> => {
          if (!user) {
            this.setStatus(401);
          }
          return user;
        }
      );
  }
}
