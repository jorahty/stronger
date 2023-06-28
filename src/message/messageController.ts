import * as express from 'express';
import { Controller, Get, Route, Security, Response, Request } from 'tsoa';

import { Message } from './message';
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
}
