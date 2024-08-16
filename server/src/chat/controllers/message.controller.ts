import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { IHasher } from 'src/api/services/hasher';
import { CreateMessageRequest } from 'src/chat/models/createMessage.request';
import { CreateMessageResponse } from 'src/chat/models/createMessage.response';
import { MessageResponse } from 'src/chat/models/message.response';
import { ChatService } from 'src/database/chat.service';
import { Message } from 'src/database/entities/message.entity';
import { MessageService } from 'src/database/message.service';
import { ChatGateway, WebSocketMessage } from 'src/websocket/chat.gateway';

@Controller({ path: 'messages' })
export class MessageController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly hasher: IHasher,
    private readonly webSocket: ChatGateway,
  ) {}

  @Get('chat/:chatId/user/:userId')
  async getAllMessage(@Param() params: any, @Res() response: Response): Promise<void> {
    const chatId = this.hasher.decode(params.chatId);
    const userId = this.hasher.decode(params.userId);

    if (!chatId || !userId) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const chat = await this.chatService.findChatById(chatId);
    if (!chat.users.some((user) => user.id === userId)) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const messages = chat.messages.map((message) => {
      const senderId = this.hasher.encode(message.userId);
      return {
        senderId: senderId,
        text: message.text,
        timeStamp: message.timestamp,
      } as MessageResponse;
    });

    response.status(HttpStatus.OK).json(messages);
  }

  @Get()
  async getMessages(@Query('chatId') chatId: string, @Query('skip') skip: string, @Query('take') take: string, @Res() response: Response): Promise<void> {
    const decodeChatId = this.hasher.decode(chatId);
    const takeParam = parseInt(take);
    const skipParam = parseInt(skip);

    const messages = (await this.messageService.find(decodeChatId, takeParam, skipParam))
      .sort((x, y) => x.timestamp.valueOf() - y.timestamp.valueOf())
      .map<MessageResponse>((message) => {
        return this.mapToMessageResponse(message);
      });

    response.status(HttpStatus.OK).json(messages);
  }

  @Get('incremental')
  async getMessagesByMessageId(@Query('chatId') chatId: string, @Query('messageId') messageId: string, @Query('take') take: string, @Res() response: Response): Promise<void> {
    const decodeChatId = this.hasher.decode(chatId);
    const decodedMessageId = this.hasher.decode(messageId);
    const takeParam = parseInt(take);
    const messages = (await this.messageService.findByMessageId2(decodeChatId, decodedMessageId, takeParam)).map<MessageResponse>((message) => {
      return this.mapToMessageResponse(message);
    });

    response.status(HttpStatus.OK).json(messages);
  }

  @Post()
  async create(@Body() request: CreateMessageRequest, @Res() response: Response): Promise<void> {
    const chatId = this.hasher.decode(request.chatId);
    const chat = await this.chatService.findChatById(chatId);

    const senderId = this.hasher.decode(request.senderId);

    if (!chat.users.some((user) => user.id === senderId)) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    let message = new Message();
    message.chat = chat;
    message.text = request.text;
    message.timestamp = new Date();
    message.userId = senderId;

    message = await this.messageService.saveMessage(message);

    const wsMessage: WebSocketMessage = {
      ...request,
      timeStamp: message.timestamp.toJSON(),
    };
    chat.users.forEach((user) => {
      this.webSocket.sendMessage(user.id, wsMessage);
    });

    const messageResponse: CreateMessageResponse = {
      messageId: this.hasher.encode(message.id),
    };

    response.status(HttpStatus.CREATED).json(messageResponse);
  }

  mapToMessageResponse(message: Message): MessageResponse {
    const senderId = this.hasher.encode(message.userId);
    const id = this.hasher.encode(message.id);
    return {
      senderId,
      id,
      text: message.text,
      timeStamp: message.timestamp,
    };
  }
}
