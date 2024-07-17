import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/api/metadatas/is-public.decorator';
import { AuthService } from 'src/auth.service';
import { UserService } from 'src/chat/database/user.service';
import { CommonErrorResponse } from 'src/chat/models/common-error.response';
import { LoginRequest } from 'src/chat/models/login.request';
import { LoginResponse } from 'src/chat/models/login.response';
import { RegisterRequest } from 'src/chat/models/register.request';
import { RegisterResponse } from 'src/chat/models/register.response';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, type: CommonErrorResponse })
  async register(@Body() request: RegisterRequest, @Res() response: Response): Promise<void> {
    if (await this.userService.exists({ userName: request.userName })) {
      const errorResponse = new CommonErrorResponse();
      errorResponse.message = 'UserName has been already taken';
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
      return;
    }

    const createdUser = await this.userService.add(request);
    const responseMessage: RegisterResponse = {
      userId: createdUser.id,
    };

    response.status(HttpStatus.CREATED).json(responseMessage);
  }

  @Public()
  @Post('login')
  async login(@Body() request: LoginRequest, @Res() response: Response): Promise<void> {
    const user = await this.userService.find({
      userName: request.userName,
      password: request.password,
    });

    if (user) {
      const authResult = await this.authService.signIn(user);
      const responseMessage: LoginResponse = {
        userId: user.id,
        accessToken: authResult.access_token,
      };
      response.status(HttpStatus.OK).json(responseMessage);
    } else {
      response.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
