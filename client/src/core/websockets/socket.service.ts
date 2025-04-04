import { WsMessage } from 'core/websockets/websocket';
import { io, Socket } from 'socket.io-client';

const WEBSOCKET_HOST = import.meta.env.VITE_WEBSOCKET_HOST;
if (WEBSOCKET_HOST === undefined) {
  console.error('VITE_WEBSOCKET_HOST is not set');
  throw Error();
}

export const socketProvider: SocketProvider = {
  socket: undefined,
  connect: (token) => {
    if (!token || socketProvider.socket) {
      return;
    }
    const socket = io(WEBSOCKET_HOST, {
      transports: ['websocket'],
      autoConnect: false,
      auth: {
        token: token + 'asdf',
      },
    });

    socketProvider.socket = socket;

    try {
      const result = socketProvider.socket.connect();
      console.log(result.connected);
    } catch (error: unknown) {
      console.log(error);
    }
  },
  sendMessage: (message: WsMessage) => {
    if (!socketProvider.socket) {
      return;
    }
    console.log(message);
    socketProvider.socket.emit('messageToServer', message);
  },
};

export type SocketProvider = {
  socket: Socket | undefined;

  connect: (token: string | undefined) => void;

  sendMessage: (message: WsMessage) => void;
};
