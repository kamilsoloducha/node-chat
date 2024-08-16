import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/api/guards/auth.guard';
import { FakeHasher, Hasher, IHasher } from 'src/api/services/hasher';
import { AuthService } from 'src/auth.service';
import { ChatController } from 'src/chat/controllers/chat.controller';
import { MessageController } from 'src/chat/controllers/message.controller';
import { UserController } from 'src/chat/controllers/user.controller';
import { ChatService } from 'src/database/chat.service';
import { DatabaseModule } from 'src/database/database.module';
import { Message } from 'src/database/entities/message.entity';
import { MessageService } from 'src/database/message.service';
import { ChatGateway, WebSocketMessage } from 'src/websocket/chat.gateway';
import { WebSocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    WebSocketModule,
    DatabaseModule,
  ],
  controllers: [UserController, ChatController, MessageController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }, { provide: IHasher, useClass: process.env.ENVIRONMENT === 'Development' ? FakeHasher : Hasher }],
})
export class ChatModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly webSocket: ChatGateway,
    private readonly hasher: IHasher,
  ) {}

  onModuleInit() {
    this.webSocket.addNewMessageListener(this.onNewMessage);
  }

  onModuleDestroy() {
    this.webSocket.removeNewMessageListener(this.onNewMessage);
  }

  private onNewMessage = async (wsMessage: WebSocketMessage): Promise<void> => {
    const chatId = this.hasher.decode(wsMessage.chatId);
    const chat = await this.chatService.findChatById(chatId);

    const senderId = this.hasher.decode(wsMessage.senderId);

    let message = new Message();
    message.chat = chat;
    message.text = wsMessage.text;
    message.timestamp = new Date();
    message.userId = senderId;

    message = await this.messageService.saveMessage(message);

    for (let receiver of chat.users.filter((x) => x.id !== senderId).map((x) => x.id)) {
      this.webSocket.sendMessage(receiver, wsMessage);
    }
  };
}
