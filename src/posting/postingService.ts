import { Posting } from './posting';
import { pool } from '../db';

export class PostingService {
  public async getAll(): Promise<Posting[]> {
    const select = `
      SELECT
        posting.id,
        json_build_object(
          'username', member.username,
          'name', member.data->>'name',
          'image', member.data->>'image'
        ) AS poster,
        posting.data->>'content' AS content,
        posting.data->>'date' AS date
      FROM
        posting
      JOIN member ON posting.poster = member.username;
    `;
    const query = {
      text: select,
      values: [],
    };
    const { rows } = await pool.query(query);
    return rows;
  }
}
