import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from 'src/chat/database/chat.service';
import { Chat } from 'src/chat/database/entities/chat.entity';
import { UserService } from 'src/chat/database/user.service';
import { CreteChatResponse } from 'src/chat/models/create-chat.response';
import { CreateChatRequest } from 'src/chat/models/createChat.request';
import { InviteUserRequest } from 'src/chat/models/invite-user.request';

@Controller({ path: 'chats' })
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @Get('user/:userId')
  async getUserChats(@Param() params: any, @Res() response: Response): Promise<void> {
    const userId = parseInt(params.userId);
    if (!userId) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const usersChats = await this.chatService.findChatsByUserId(userId);

    response.status(HttpStatus.OK).json(usersChats);
  }

  @Post()
  async creteChat(@Body() request: CreateChatRequest, @Res() response: Response): Promise<void> {
    var existedChat = await this.chatService.findChatsByUserIds([request.senderId, request.receiverId]);
    if (existedChat) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const senderProm = this.userService.findById(request.senderId);
    const receiverProm = this.userService.findById(request.receiverId);

    var users = [await senderProm, await receiverProm];

    let chat = new Chat();
    chat.users = users;
    chat.name = `${users[0].userName}, ${users[1].userName}`;

    chat = await this.chatService.save(chat);

    const responseMessage: CreteChatResponse = {
      chatId: chat.id,
    };

    response.status(HttpStatus.CREATED).json(responseMessage);
  }

  @Post('invite')
  async addUserToChat(@Body() request: InviteUserRequest, @Res() response: Response): Promise<void> {
    const chat = await this.chatService.findChatById(request.chatId);

    if (!chat.users.some((user) => user.id == request.senderId) || chat.users.some((user) => user.id == request.invitedId)) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const invitedUser = await this.userService.findById(request.invitedId);

    chat.users.push(invitedUser);

    this.chatService.save(chat);

    response.sendStatus(HttpStatus.ACCEPTED);
  }
}
