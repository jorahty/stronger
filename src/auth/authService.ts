import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { Credentials, JwtPayload, LoginResponse } from './auth';
import { SessionUser } from 'src/types/custom';

import users from '../../data/users.json';

export class AuthService {
  public async login(
    credentials: Credentials
  ): Promise<LoginResponse | undefined> {
    // find user
    const user = users.find((user) => user.username === credentials.username);

    if (user && bcrypt.compareSync(credentials.password, user.pwhash)) {
      const accessToken = jwt.sign(
        { username: user.username, name: user.name, scopes: ['member'] },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: '30m',
          algorithm: 'HS256',
        }
      );
      return { username: user.name, accessToken: accessToken };
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
            resolve({ username: user.username, name: user.name });
          }
        );
      }
    });
  }
}
