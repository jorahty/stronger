import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { Credentials, LoginResponse } from './auth';

import users from '../../data/users.json';

export class AuthService {
  public async login(
    credentials: Credentials
  ): Promise<LoginResponse | undefined> {
    const user = users.find((user) => {
      return (
        user.email === credentials.username &&
        bcrypt.compareSync(credentials.password, user.password)
      );
    });
    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, name: user.name, scopes: user.roles },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: '30m',
          algorithm: 'HS256',
        }
      );
      return { name: user.name, accessToken: accessToken };
    } else {
      return undefined;
    }
  }

  public async check(authHeader?: string, scopes?: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error('Unauthorized'));
      } else {
        const token = authHeader.split(' ')[1];
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN as string,
          (err: any, user: any) => {
            if (err) {
              reject(err);
            } else if (scopes) {
              for (const scope of scopes) {
                if (!user.scopes || !user.scopes.includes(scope)) {
                  reject(new Error('Unauthorized'));
                }
              }
            }
            resolve({ email: user.email, name: user.name });
          }
        );
      }
    });
  }
}
