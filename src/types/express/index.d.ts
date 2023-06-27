import { SessionUser } from '../custom';

declare global {
  namespace Express {
    export interface Request {
      user?: SessionUser;
    }
  }
}

export {};
