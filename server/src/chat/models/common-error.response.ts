import { ApiProperty } from '@nestjs/swagger';

export type ErrorCode = string;

export type RegisterErrorCode = ErrorCode & 'USER_ALREADY_EXISTS';

export class CommonErrorResponse<TErrorCode extends ErrorCode> {
  @ApiProperty()
  message: string;
  @ApiProperty()
  errorCode: TErrorCode;
}
