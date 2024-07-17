import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageRequest {
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @IsNotEmpty({ always: true })
  chatId: number;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @IsNotEmpty({ always: true })
  senderId: number;

  @IsNotEmpty()
  text: string;
}
