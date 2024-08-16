import { Injectable } from '@nestjs/common';
import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IHasher } from 'src/api/services/hasher';

@WebSocketGateway(3001, { transports: ['websocket'] })
@Injectable()
export class ChatGateway implements OnGatewayDisconnect<Socket> {
  private newMessageListeners: NewMessageListener[] = [];

  private clients: Set<SocketCustomInfo> = new Set();
  @WebSocketServer() server: Server;

  constructor(private readonly hasher: IHasher) {}

  handleDisconnect(client: Socket) {
    let socketInfo: SocketCustomInfo;
    for (let item of this.clients) {
      if (item.socket.id === client.id) {
        socketInfo = item;
      }
    }
    console.log(`Client disconnected: ${client.id} / ${socketInfo.userId}`);

    this.clients.delete(socketInfo);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(client: Socket, payload: WebSocketMessage): Promise<void> {
    console.log(`Message from client ${client.id}: ${payload}`);
    for (let listener of this.newMessageListeners) {
      await listener(payload);
    }
  }

  @SubscribeMessage('connectUser')
  handleConnectUser(client: Socket, payload: WebSocketConnectUser): void {
    console.log(`User ${payload.userId} connected by ${client.id}`);
    const decoded = this.hasher.decode(payload.userId);
    const sockerInfo: SocketCustomInfo = {
      userId: decoded,
      socket: client,
    };
    this.clients.add(sockerInfo);
  }

  sendMessage(receiverId: number, message: WebSocketMessage): void {
    for (let item of this.clients) {
      if (item.userId !== receiverId) continue;
      item.socket.emit('message-sent', message);
    }
  }

  addNewMessageListener(listener: NewMessageListener): void {
    this.newMessageListeners.push(listener);
  }

  removeNewMessageListener(listener: NewMessageListener): void {
    const index = this.newMessageListeners.indexOf(listener);
    if (index > -1) {
      this.newMessageListeners.splice(index, 1);
    }
  }
}

export type WebSocketMessage = {
  chatId: string;
  text: string;
  senderId: string;
  timeStamp: string;
};

export type WebSocketConnectUser = {
  userId: string;
};

export type SocketCustomInfo = {
  userId: number;
  socket: Socket;
};

export type NewMessageListener = (message: WebSocketMessage) => void | Promise<void>;
