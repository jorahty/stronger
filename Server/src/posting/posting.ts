import { User } from '../user/user';

/**
 * @pattern ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
 * @example "c6a7a7a3-b830-47a0-8bb4-d555ce887d23"
 */
export type UUID = string;

export interface Posting {
  id: UUID;
  poster: User;
  content: string;
  date: string;
}

export interface NewPosting {
  content: string;
}
