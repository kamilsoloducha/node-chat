import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/database/entities/message.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
  ) {}

  saveMessage(message: Message): Promise<Message> {
    return this.repository.save(message);
  }

  find(chatId: number, take: number, skip: number): Promise<Message[]> {
    var messages = this.repository.find({ select: { id: true, userId: true, text: true, timestamp: true }, take, skip, order: { timestamp: 'DESC' }, where: { chat: { id: chatId } } });
    return messages;
  }

  findByMessageId(chatId: number, messageId: number, take: number): Promise<Message[]> {
    return this.repository.find({ select: { id: true, userId: true, text: true, timestamp: true }, take, order: { timestamp: 'DESC' }, where: { chat: { id: chatId }, id: LessThan(messageId) } });
  }

  findByMessageId2(chatId: number, messageId: number, take: number): Promise<Message[]> {
    return this.repository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.chat', 'chat')
      .where('chat.id = :chatId and message.id < :messageId', { chatId, messageId })
      .orderBy('message.timestamp', 'DESC')
      .take(take)
      .getMany();
  }
}
