import { pool } from '../db';
import { User } from './user';

export class UserService {
  public async getWith(username: string): Promise<User[]> {
    const select = `
      SELECT
        m.username,
        m.data ->> 'name' AS name,
        m.data ->> 'image' AS image
      FROM
        member m
      WHERE
        m.username IN (
          SELECT DISTINCT
            CASE
              WHEN sender = $1 THEN receiver
              WHEN receiver = $1 THEN sender
            END
          FROM
            message 
          WHERE
            sender = $1 OR receiver = $1
        )
        AND m.username != $1;
    `;
    const query = {
      text: select,
      values: [username],
    };
    const { rows } = await pool.query(query);
    return rows;
  }
}
