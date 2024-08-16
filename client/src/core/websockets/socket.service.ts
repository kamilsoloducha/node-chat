import { WsConnectUser, WsMessage } from 'core/websockets/websocket';
import { io, Socket } from 'socket.io-client';

const WEBSOCKET_HOST = import.meta.env.VITE_WEBSOCKET_HOST;
let socket: Socket;
if (WEBSOCKET_HOST === undefined) {
  console.error('VITE_WEBSOCKET_HOST is not set');
  throw Error();
} else {
  socket = io(WEBSOCKET_HOST, { transports: ['websocket'], autoConnect: false });
}

export const socketProvider: SocketProvider = {
  socket: socket,
  connect: () => {
    socketProvider.socket.connect();
  },
  sendMessage: (message: WsMessage) => {
    console.log(message);
    socketProvider.socket.emit('messageToServer', message);
  },
};

export type SocketProvider = {
  socket: Socket;

  connect: () => void;

  sendMessage: (message: WsMessage) => void;
};
