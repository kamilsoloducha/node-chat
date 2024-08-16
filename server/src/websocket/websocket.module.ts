import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FakeHasher, Hasher, IHasher } from 'src/api/services/hasher';
import { DatabaseModule } from 'src/database/database.module';
import { ChatGateway } from 'src/websocket/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    DatabaseModule,
  ],
  exports: [ChatGateway],
  providers: [ChatGateway, { provide: IHasher, useClass: process.env.ENVIRONMENT === 'Development' ? FakeHasher : Hasher }],
})
export class WebSocketModule {}
