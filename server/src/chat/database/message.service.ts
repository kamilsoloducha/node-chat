import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/chat/database/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
  ) {}

  saveMessage(message: Message): Promise<Message> {
    return this.repository.save(message);
  }
}
