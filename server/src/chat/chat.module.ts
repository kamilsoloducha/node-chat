import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/api/guards/auth.guard';
import { AuthService } from 'src/auth.service';
import { ChatController } from 'src/chat/controllers/chat.controller';
import { MessageController } from 'src/chat/controllers/message.controller';
import { UserController } from 'src/chat/controllers/user.controller';
import { ChatService } from 'src/chat/database/chat.service';
import { Chat } from 'src/chat/database/entities/chat.entity';
import { Message } from 'src/chat/database/entities/message.entity';
import { User } from 'src/chat/database/entities/user.entity';
import { MessageService } from 'src/chat/database/message.service';
import { UserService } from 'src/chat/database/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat, Message])],
  exports: [TypeOrmModule],
  controllers: [UserController, ChatController, MessageController],
  providers: [UserService, ChatService, MessageService, AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class ChatModule {}
