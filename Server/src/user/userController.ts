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

  @Put()
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  @Response('415', 'Unsupported Media Type')
  public async updateUserDetails(
    @Request() req: express.Request,
    @FormField() name: string,
    @FormField() location: string,
    @FormField() website: string,
    @FormField() bio: string,
    @UploadedFile() imageFile?: Express.Multer.File
  ): Promise<void | UserDetails> {
    let image = req.user.image;

    if (imageFile) {
      const supported = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

      if (!supported.includes(imageFile.mimetype)) {
        return this.setStatus(415);
      }

      image = await new UserService().createImage(imageFile);
    }

    const userDetails = {
      username: req.user.username,
      name: name,
      image: image,
      location: location,
      website: website,
      bio: bio,
    };

    return new UserService().updateDetails(userDetails);
  }
}
