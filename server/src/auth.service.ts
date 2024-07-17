import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/chat/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(user: User): Promise<{ access_token: string }> {
    const jwtPayload = { sub: user.id, username: user.userName };

    return { access_token: await this.jwtService.signAsync(jwtPayload) };
  }
}
