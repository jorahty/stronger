import { pool } from '../db';
import { NewUserDetails, User, UserDetails } from './user';

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

  public async getDetails(username: string): Promise<UserDetails> {
    const select = `
      SELECT
        username,
        data->>'name' AS name,
        data->>'image' AS image,
        data->>'location' AS location,
        data->>'website' AS website,
        data->>'bio' AS bio
      FROM
        member
      WHERE
        username = $1;
    `;
    const query = {
      text: select,
      values: [username],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  public async updateDetails(
    username: string,
    newUserDetials: NewUserDetails
  ): Promise<UserDetails> {
    return {
      username: username,
      ...newUserDetials,
    };
  }
}
