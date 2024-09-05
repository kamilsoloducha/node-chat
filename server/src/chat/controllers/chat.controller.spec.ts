import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { ChatController } from 'src/chat/controllers/chat.controller';
import { ChatService } from 'src/database/chat.service';
import { UserService } from 'src/database/user.service';
import { IHasher } from 'src/api/services/hasher';
import { createMockObj } from 'src/util.spec';

describe('ChatController', () => {
  let chatService: ChatService;
  let userService: UserService;
  let hasher: IHasher;

  let chatController: ChatController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        { provide: ChatService, useValue: createMockObj(ChatService) },
        { provide: UserService, useValue: createMockObj(UserService) },
        { provide: IHasher, useValue: createMockObj(IHasher) },
      ],
    }).compile();

    chatService = moduleRef.get<ChatService>(ChatService);
    userService = moduleRef.get<UserService>(UserService);
    hasher = moduleRef.get<IHasher>(IHasher);

    chatController = moduleRef.get<ChatController>(ChatController);
  });

  describe('getUserChats', () => {
    let params: any;
    let response: Response;

    beforeEach(() => {
      let params = { userId: '1' };
      let response = {
        sendStatus: jest.fn(),
        status: jest.fn(),
      };
      jasmine.createSpyObj<Response>('res', ['sendStatus', 'status']) as Response;
    });

    it("should return BAD_REQUEST if userId can't be paresed", async () => {
      jest.spyOn(hasher, 'decode').mockReturnValue(null);

      await chatController.getUserChats(params, response as any);

      expect(response.sendStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });
});
