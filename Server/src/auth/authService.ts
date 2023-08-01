import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { pool } from '../db';
import { Credentials, JwtPayload, LoginResponse } from './auth';
import { SessionUser } from 'src/types/custom';

export class AuthService {
  public async login(
    credentials: Credentials
  ): Promise<LoginResponse | undefined> {
    const select = `
      SELECT
        member.username,
        member.data->>'pwhash' AS pwhash,
        member.data->>'name' AS name,
        member.data->>'image' AS image
      FROM
        member
      WHERE
        member.username = $1;
    `;
    const query = {
      text: select,
      values: [credentials.username],
    };
    const { rows } = await pool.query(query);
    const user = rows[0];

    if (user && bcrypt.compareSync(credentials.password, user.pwhash)) {
      const accessToken = jwt.sign(
        {
          username: user.username,
          name: user.name,
          image: user.image,
          scopes: ['member'],
        },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: '3h',
          algorithm: 'HS256',
        }
      );
      return {
        user: {
          username: user.username,
          name: user.name,
          image: user.image,
        },
        accessToken: accessToken,
      };
    } else {
      return undefined;
    }
  }

  public async check(
    authHeader?: string,
    scopes?: string[]
  ): Promise<SessionUser> {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error('Unauthorized'));
      } else {
        const token = authHeader.split(' ')[1];
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN as string,
          (err, decoded) => {
            const user = decoded as JwtPayload;
            if (err) {
              reject(err);
            } else if (scopes) {
              for (const scope of scopes) {
                if (!user.scopes || !user.scopes.includes(scope)) {
                  reject(new Error('Unauthorized'));
                }
              }
            }
            resolve({
              username: user.username,
              name: user.name,
              image: user.image,
            });
          }
        );
      }
    });
  }
}
