import { Body, Controller, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/api/metadatas/is-public.decorator';
import { IHasher } from 'src/api/services/hasher';
import { AuthService } from 'src/auth.service';
import { CommonErrorResponse, LoginErrorCode, RegisterErrorCode } from 'src/chat/models/common-error.response';
import { LoginRequest } from 'src/chat/models/login.request';
import { LoginResponse } from 'src/chat/models/login.response';
import { RegisterRequest } from 'src/chat/models/register.request';
import { RegisterResponse } from 'src/chat/models/register.response';
import { UserService } from 'src/database/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly hasher: IHasher,
  ) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, type: CommonErrorResponse<RegisterErrorCode> })
  async register(@Body() request: RegisterRequest, @Res() response: Response): Promise<void> {
    if (await this.userService.exists({ userName: request.userName })) {
      const errorResponse = new CommonErrorResponse<RegisterErrorCode>();
      errorResponse.message = 'UserName has been already taken';
      errorResponse.errorCode = 'USER_ALREADY_EXISTS';
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
      return;
    }

    const createdUser = await this.userService.add(request);

    const encodedUserId = this.hasher.encode(createdUser.id);
    const responseMessage: RegisterResponse = {
      userId: encodedUserId,
    };

    response.status(HttpStatus.CREATED).json(responseMessage);
  }

  @Public()
  @Put('login')
  async login(@Body() request: LoginRequest, @Res() response: Response): Promise<void> {
    const user = await this.userService.find({
      userName: request.userName,
      password: request.password,
    });

    if (user) {
      const authResult = await this.authService.signIn(user);
      const encodedId = this.hasher.encode(user.id);
      const responseMessage: LoginResponse = {
        userId: encodedId,
        accessToken: authResult.accessToken,
        expirationDate: authResult.expirationDate,
      };
      response.status(HttpStatus.OK).json(responseMessage);
    } else {
      const errorResponse = new CommonErrorResponse<LoginErrorCode>();
      errorResponse.message = 'Bad credentials';
      errorResponse.errorCode = 'BAD_CREDENTIALS';
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    }
  }

  @Public()
  @Put('refresh')
  async refresh(@Body() request: RefreshRequest, @Res() response: Response): Promise<void> {
    const tokenInfo = await this.authService.refresh(request.token);

    const responseMessage: LoginResponse = {
      userId: this.hasher.encode(tokenInfo.userId),
      accessToken: tokenInfo.accessToken,
      expirationDate: tokenInfo.expirationDate,
    };
    response.status(HttpStatus.OK).json(responseMessage);
  }
}
