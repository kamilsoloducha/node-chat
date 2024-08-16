import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(user: User): Promise<TokenInfo> {
    const jwtPayload = { sub: user.id, username: user.userName };

    const expirationDate = new Date().addHours(1);

    return {
      userId: user.id,
      userName: user.userName,
      accessToken: await this.jwtService.signAsync(jwtPayload, { expiresIn: '1h' }),
      expirationDate,
    };
  }

  async refresh(token: string): Promise<TokenInfo> {
    var payload = await this.jwtService.verifyAsync(token);

    const expirationDate = new Date().addHours(1);
    const jwtPayload = { sub: payload.sub, username: payload.username };

    return {
      userId: payload.sub,
      userName: payload.username,
      accessToken: await this.jwtService.signAsync(jwtPayload, { expiresIn: '1h' }),
      expirationDate,
    };
  }
}

export type TokenInfo = {
  userId: number;
  userName: string;
  accessToken: string;
  expirationDate: Date;
};
