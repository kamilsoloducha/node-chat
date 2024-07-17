import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Length } from 'class-validator';

export class LoginRequest {
  @IsAlphanumeric()
  @Length(5, 64)
  @ApiProperty()
  readonly userName: string;

  @ApiProperty()
  @IsAlphanumeric()
  @Length(5, 64)
  readonly password: string;
}
