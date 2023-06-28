import { UUID } from '../posting/posting';

export interface Message {
  id: UUID;
  sender: string;
  receiver: string;
  content: string;
  date: string;
}
