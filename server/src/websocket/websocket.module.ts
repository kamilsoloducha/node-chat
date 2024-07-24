import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FakeHasher, Hasher, IHasher } from 'src/api/services/hasher';
import { ChatGateway } from 'src/websocket/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
  ],
  exports: [ChatGateway],
  providers: [ChatGateway, { provide: IHasher, useClass: process.env.ENVIRONMENT === 'Development' ? FakeHasher : Hasher }],
})
export class WebSocketModule {}
