import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/database/configs/user.schema';
import { LoginController } from 'src/user/controllers/login.controller';
import { RegisterController } from 'src/user/controllers/register.controller';
import { UsersService } from 'src/user/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  exports: [TypeOrmModule],
  controllers: [RegisterController, LoginController],
  providers: [UsersService],
})
export class UserModule {}
