import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from 'src/chat/database/chat.service';
import { Chat } from 'src/chat/database/entities/chat.entity';
import { UserService } from 'src/chat/database/user.service';
import { CreteChatResponse } from 'src/chat/models/create-chat.response';
import { CreateChatRequest } from 'src/chat/models/createChat.request';
import { InviteUserRequest } from 'src/chat/models/invite-user.request';
import { IHasher } from 'src/api/services/hasher';

@Controller({ path: 'chats' })
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly hasher: IHasher,
  ) {}

  @Get('user/:userId')
  async getUserChats(@Param() params: any, @Res() response: Response): Promise<void> {
    const userId = this.hasher.decode(params.userId);
    if (!userId) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const usersChats = await this.chatService.findChatsByUserId(userId);

    response.status(HttpStatus.OK).json(usersChats);
  }

  @Post()
  async creteChat(@Body() request: CreateChatRequest, @Res() response: Response): Promise<void> {
    const senderId = this.hasher.decode(request.senderId);
    const receiverId = this.hasher.decode(request.receiverId);
    var existedChat = await this.chatService.findChatsByUserIds([senderId, receiverId]);
    if (existedChat) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const senderProm = this.userService.findById(senderId);
    const receiverProm = this.userService.findById(receiverId);

    var users = [await senderProm, await receiverProm];

    let chat = new Chat();
    chat.users = users;
    chat.name = `${users[0].userName}, ${users[1].userName}`;

    chat = await this.chatService.save(chat);

    const responseMessage: CreteChatResponse = {
      chatId: this.hasher.encode(chat.id),
    };

    response.status(HttpStatus.CREATED).json(responseMessage);
  }

  @Post('invite')
  async addUserToChat(@Body() request: InviteUserRequest, @Res() response: Response): Promise<void> {
    const chatId = this.hasher.decode(request.chatId);
    const chat = await this.chatService.findChatById(chatId);

    const senderId = this.hasher.decode(request.senderId);
    const invitedId = this.hasher.decode(request.invitedId);
    if (!chat.users.some((user) => user.id === senderId) || chat.users.some((user) => user.id === invitedId)) {
      response.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const invitedUser = await this.userService.findById(invitedId);

    chat.users.push(invitedUser);

    this.chatService.save(chat);

    response.sendStatus(HttpStatus.ACCEPTED);
  }
}
