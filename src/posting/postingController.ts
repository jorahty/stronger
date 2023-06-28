import * as express from 'express';
import {
  Controller,
  Get,
  Route,
  Security,
  Response,
  Post,
  SuccessResponse,
  Body,
  Request,
} from 'tsoa';

import { NewPosting, Posting } from './posting';
import { PostingService } from './postingService';

@Route('posting')
export class PostingController extends Controller {
  @Get('')
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  public async getPostings(): Promise<Posting[]> {
    return new PostingService().getAll();
  }

  @Post()
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  @SuccessResponse('201', 'Posting created')
  public async createPosting(
    @Body() { content }: NewPosting
  ): // @Request() { user: { username } }: express.Request
  Promise<Posting> {
    // return await new PostingService().create(username, content);
    return await new PostingService().create('kyle', content);
  }
}
