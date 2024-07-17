import { ApiProperty } from '@nestjs/swagger';

export class CommonErrorResponse {
  @ApiProperty()
  message: string;
}
