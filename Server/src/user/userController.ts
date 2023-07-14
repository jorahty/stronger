import * as express from 'express';
import {
  Controller,
  Get,
  Route,
  Security,
  Response,
  Request,
  Put,
  Body,
  UploadedFile,
  FormField,
} from 'tsoa';

import { NewUserDetails, User, UserDetails } from './user';
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

  @Put()
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  public async updateUserDetails(
    @UploadedFile() image: Express.Multer.File,
    @FormField() name: string,
    @FormField() location: string,
    @FormField() website: string,
    @FormField() bio: string,
    @Request() req: express.Request
  ): Promise<UserDetails> {
    const url = 'Hello, World!';

    const newUserDetails = {
      name: name,
      image: url,
      location: location,
      website: website,
      bio: bio,
    };

    return new UserService().updateDetails(req.user.username, newUserDetails);
  }
}
