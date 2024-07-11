import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterRequest } from 'src/user/controllers/register.request';
import { RegisterResponse } from 'src/user/controllers/register.response';
import { UsersService } from 'src/user/users.service';

@Controller('user/register')
export class RegisterController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async register(
    @Body() request: RegisterRequest,
    @Res() response: Response,
  ): Promise<void> {
    if (await this.userService.exists({ userName: request.userName })) {
      response.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const createdUser = await this.userService.add(request);
    const responseMessage: RegisterResponse = {
      userId: createdUser.id,
    };

    response.status(HttpStatus.CREATED).json(responseMessage);
  }
}
