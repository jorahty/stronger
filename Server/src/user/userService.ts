import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

  public async createImage(image: Express.Multer.File): Promise<string> {
    // Generate new id
    const id = uuidv4();

    // Derive file extention from `file.mimetype`
    const fileExtention = image.mimetype.split('/')[1];

    // Define file name
    const fileName = id + '.' + fileExtention;

    // Determine file path
    const filePath = path.join(__dirname, '../../image', fileName);

    // Write to disk (into the directory named `image`)
    fs.writeFileSync(filePath, image.buffer);

    // Return file name
    return fileName;
  }

  public async updateDetails(userDetails: UserDetails): Promise<UserDetails> {
    const update = `
      UPDATE member
      SET data = data || jsonb_build_object(
        'name', $2::text,
        'image', $3::text,
        'location', $4::text,
        'website', $5::text,
        'bio', $6::text
      )
      WHERE username = $1
      RETURNING
        username,
        data->>'name' AS name,
        data->>'image' AS image,
        data->>'location' AS location,
        data->>'website' AS website,
        data->>'bio' AS bio;
    `;
    const query = {
      text: update,
      values: [
        userDetails.username,
        userDetails.name,
        userDetails.image,
        userDetails.location,
        userDetails.website,
        userDetails.bio,
      ],
    };
    const { rows } = await pool.query(query);
    return rows[0];
  }
}
