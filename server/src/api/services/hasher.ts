import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import HashIds from 'hashids';

@Injectable()
export abstract class IHasher {
  abstract encode(id: number): string;
  abstract decode(hashedId: string): number;
}

@Injectable()
export class Hasher implements IHasher {
  private readonly hashIds: HashIds;

  constructor(private readonly configService: ConfigService) {
    const salt = configService.get('HASHING_SALT');
    const length = parseInt(configService.get('HASHING_LENGTH'));

    this.hashIds = new HashIds(salt, length);
  }

  encode(id: number): string {
    return this.hashIds.encode(id);
  }

  decode(hashedId: string): number {
    const decoded = this.hashIds.decode(hashedId)[0];
    if (typeof decoded === 'number') {
      return decoded;
    }
    return 0;
  }
}

@Injectable()
export class FakeHasher implements IHasher {
  encode(id: number): string {
    return `${id}`;
  }
  decode(hashedId: string): number {
    return parseInt(hashedId);
  }
}
