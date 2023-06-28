import * as express from 'express';
import { Controller, Get, Route, Security, Response, Request } from 'tsoa';

import { User, UserDetails } from './user';
import { UserService } from './userService';

@Route('user')
export class UserController extends Controller {
  @Get()
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  public async getUsers(@Request() req: express.Request): Promise<User[]> {
    return new UserService().getWith(req.user.username);
  }

  @Get('{username}')
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  public async getUserDetails(username: string): Promise<UserDetails> {
    return new UserService().getDetails(username);
  }
}
