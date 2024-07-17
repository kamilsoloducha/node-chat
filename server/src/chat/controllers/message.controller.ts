import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from 'src/chat/database/chat.service';
import { Message } from 'src/chat/database/entities/message.entity';
import { MessageService } from 'src/chat/database/message.service';
import { CreateMessageRequest } from 'src/chat/models/createMessage.request';
import { CreateMessageResponse } from 'src/chat/models/createMessage.response';
import { MessageResponse } from 'src/chat/models/message.response';

@Controller({ path: 'messages' })
export class MessageController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @Get('chat/:chatId/user/:userId')
  async getAllMessage(@Param() params: any, @Res() response: Response): Promise<void> {
    const chatId = parseInt(params.chatId);
    const userId = parseInt(params.userId);

    if (!chatId || !userId) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const chat = await this.chatService.findChatById(chatId);
    if (!chat.users.some((user) => user.id == userId)) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const messages = chat.messages.map((message) => {
      return {
        senderId: message.userId,
        text: message.text,
        timeStamp: message.timestamp,
      } as MessageResponse;
    });

    response.status(HttpStatus.OK).json(messages);
  }

  @Post()
  async create(@Body() request: CreateMessageRequest, @Res() response: Response): Promise<void> {
    const chat = await this.chatService.findChatById(request.chatId);

    if (!chat.users.some((user) => user.id == request.senderId)) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    let message = new Message();
    message.chat = chat;
    message.text = request.text;
    message.timestamp = new Date();
    message.userId = request.senderId;

    message = await this.messageService.saveMessage(message);

    const messageResponse: CreateMessageResponse = {
      messageId: message.id,
    };

    response.status(HttpStatus.CREATED).json(messageResponse);
  }
}
