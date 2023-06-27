import { Controller, Get, Route } from 'tsoa';

import { Posting } from './posting';
import { PostingService } from './postingService';

@Route('posting')
export class PostingController extends Controller {
  @Get('')
  public async getAll(): Promise<Posting[]> {
    return new PostingService().getAll();
  }
}
