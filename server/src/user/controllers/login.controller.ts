import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginRequest } from 'src/user/controllers/login.request';
import { LoginResponse } from 'src/user/controllers/login.response';
import { UsersService } from 'src/user/users.service';

@Controller('user/login')
export class LoginController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async login(
    @Body() request: LoginRequest,
    @Res() response: Response,
  ): Promise<void> {
    const user = await this.userService.find({
      userName: request.userName,
      password: request.password,
    });

    if (user) {
      const responseMessage: LoginResponse = {
        userId: user.id,
      };
      response.status(HttpStatus.OK).json(responseMessage);
    } else {
      response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
