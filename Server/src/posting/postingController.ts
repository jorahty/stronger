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
  Delete,
} from 'tsoa';

import { NewPosting, Posting, UUID } from './posting';
import { PostingService } from './postingService';

@Route('posting')
export class PostingController extends Controller {
  @Get()
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
    @Body() { content }: NewPosting,
    @Request() req: express.Request
  ): Promise<Posting> {
    return await new PostingService().create(req.user.username, content);
  }

  @Delete('{id}')
  @Security('jwt', ['member'])
  @Response('401', 'Unauthorized')
  @Response('403', 'Forbidden')
  @Response('404', 'Posting not found')
  @SuccessResponse('204', 'Posting deleted')
  public async deletePosting(
    id: UUID,
    @Request() req: express.Request
  ): Promise<void> {
    const posting = await new PostingService().getOne(id);
    if (!posting) {
      this.setStatus(404);
    } else if (req.user.username !== posting.poster.username) {
      this.setStatus(403);
    } else {
      return await new PostingService().delete(id);
    }
  }
}
