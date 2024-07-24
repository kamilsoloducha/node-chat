import { ApiProperty } from '@nestjs/swagger';

export type ErrorCode = string;

export type RegisterErrorCode = ErrorCode & 'USER_ALREADY_EXISTS';
export type LoginErrorCode = ErrorCode & 'BAD_CREDENTIALS';

export class CommonErrorResponse<TErrorCode extends ErrorCode> {
  @ApiProperty()
  message: string;
  @ApiProperty()
  errorCode: TErrorCode;
}
