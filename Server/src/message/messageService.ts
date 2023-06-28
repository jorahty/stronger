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

  public async create(
    sender: string,
    receiver: string,
    content: string
  ): Promise<Message> {
    const insert = `
      INSERT INTO message (sender, receiver, data)
      VALUES ($1, $2, $3)
      RETURNING
        message.id,
        message.sender,
        message.receiver,
        message.data->>'content' AS content,
        message.data->>'date' AS date
    `;
    const data = {
      content: content,
      date: new Date().toISOString(),
    };
    const query = {
      text: insert,
      values: [sender, receiver, data],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }
}
