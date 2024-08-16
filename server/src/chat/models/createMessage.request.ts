import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageRequest {
  @IsNotEmpty({ always: true })
  chatId: string;

  @IsNotEmpty({ always: true })
  senderId: string;

  @IsNotEmpty()
  text: string;
}
