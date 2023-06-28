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

  public async getOne(id: string): Promise<undefined | Posting> {
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
      JOIN member ON posting.poster = member.username
      WHERE
        posting.id = $1;
    `;
    const query = {
      text: select,
      values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  public async create(poster: string, content: string): Promise<Posting> {
    const insert = `
      INSERT INTO posting (poster, data)
      VALUES ($1, $2)
      RETURNING
        posting.id,
        (
          SELECT json_build_object(
            'username', member.username,
            'name', member.data->>'name',
            'image', member.data->>'image'
          )
          FROM member
          WHERE member.username = $1
        ) AS poster,
        posting.data->>'content' AS content,
        posting.data->>'date' AS date;
    `;
    const data = {
      content: content,
      date: new Date().toISOString(),
    };
    const query = {
      text: insert,
      values: [poster, data],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }

  public async delete(id: string): Promise<void> {
    const query = {
      text: 'DELETE FROM posting WHERE id = $1;',
      values: [id],
    };
    await pool.query(query);
  }
}
