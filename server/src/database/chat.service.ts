import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private readonly chatReporistory: Repository<Chat>) {}

  save(chat: Chat): Promise<Chat> {
    return this.chatReporistory.save(chat);
  }

  findChatsByUserId(userId: number): Promise<Chat[]> {
    return this.chatReporistory.createQueryBuilder('chat').leftJoin('chat.users', 'u', 'u.id = :userId', { userId }).getMany();
  }

  findChatsByUserIds(ids: number[]): Promise<Chat> {
    return this.chatReporistory.createQueryBuilder('chat').leftJoin('chat.users', 'u', 'u.id in (:ids)', { ids }).getOne();
  }

  findChatById(chatId: number): Promise<Chat> {
    return this.chatReporistory.createQueryBuilder('chat').leftJoinAndSelect('chat.users', 'user').leftJoinAndSelect('chat.messages', 'message').where('chat.id = :chatId', { chatId }).getOne();
  }
}
