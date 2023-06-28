import { pool } from '../db';
import { Message } from './message';

export class MessageService {
  public async getAll(
    usernameA: string,
    usernameB: string
  ): Promise<Message[]> {
    const select = `
      SELECT
        message.id,
        message.sender,
        message.receiver,
        message.data->>'content' AS content,
        message.data->>'date' AS date
      FROM
        message
      WHERE
        (message.sender = $1 AND message.receiver = $2)
        OR (message.sender = $2 AND message.receiver = $1);
    `;
    const query = {
      text: select,
      values: [usernameA, usernameB],
    };
    const { rows } = await pool.query(query);
    return rows;
  }
}
