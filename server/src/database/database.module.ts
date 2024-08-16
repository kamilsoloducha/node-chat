import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from 'src/database/chat.service';
import { Chat } from 'src/database/entities/chat.entity';
import { Message } from 'src/database/entities/message.entity';
import { User } from 'src/database/entities/user.entity';
import { MessageService } from 'src/database/message.service';
import { UserService } from 'src/database/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat, Message])],
  exports: [TypeOrmModule, UserService, ChatService, MessageService],
  providers: [UserService, ChatService, MessageService],
})
export class DatabaseModule {}
