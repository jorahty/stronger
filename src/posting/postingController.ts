import { Controller, Get, Route, Security, Response } from 'tsoa';

import { Posting } from './posting';
import { PostingService } from './postingService';

@Route('posting')
export class PostingController extends Controller {
  @Get('')
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  public async getAll(): Promise<Posting[]> {
    return new PostingService().getAll();
  }
}
