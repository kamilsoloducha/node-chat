import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageRequest {
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @IsNotEmpty({ always: true })
  chatId: string;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @IsNotEmpty({ always: true })
  senderId: string;

  @IsNotEmpty()
  text: string;
}
