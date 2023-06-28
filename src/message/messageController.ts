import * as express from 'express';
import {
  Controller,
  Get,
  Route,
  Security,
  Response,
  Request,
  Post,
  SuccessResponse,
  Body,
} from 'tsoa';

import { UUID } from '../posting/posting';
import { Message, NewMessage } from './message';
import { MessageService } from './messageService';

@Route('message')
export class MessageController extends Controller {
  @Get('{username}')
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  public async getMessages(
    username: string,
    @Request() req: express.Request
  ): Promise<Message[]> {
    return new MessageService().getAll(req.user.username, username);
  }

  @Post('{username}')
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  @SuccessResponse('201', 'Message sent')
  public async createMessage(
    username: string,
    @Body() { content }: NewMessage,
    @Request() req: express.Request
  ): Promise<Message> {
    return await new MessageService().create(
      req.user.username,
      username,
      content
    );
  }
}
