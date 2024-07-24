import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { createContext, ReactElement, useContext, useRef } from 'react';
import { SocketProvider, socketProvider } from 'core/websockets/socket.service';
import { useAppDispatch } from 'store/store';
import { addNewMessage, changeConnectionStatus } from 'store/chat/reducer';
import { AddNewMessage } from 'store/chat/actions';
import { useUserStorage } from 'core/hooks/useUserStorage';

export const WebSocketContext = createContext<SocketProvider>(socketProvider);

export const useWebSocketContext = () => useContext(WebSocketContext);

export function Websocket({ children }: { children: ReactElement }): ReactElement {
  const dispatch = useAppDispatch();
  const webSocketContext = useWebSocketContext();

  const { get } = useUserStorage();
  const userId = get()?.id ?? '';
  if (userId) {
    webSocketContext.connect();
  }

  useEffectOnce(() => {
    function onConnect(): void {
      console.log('ws connected');
      const message: WsConnectUser = { userId };
      socketProvider.socket?.emit('connectUser', message);
      dispatch(changeConnectionStatus(true));
    }

    function onDisconnect(): void {
      console.log('ws disconnected');
      dispatch(changeConnectionStatus(false));
    }

    function onMessageReceived(message: WsMessage): void {
      const payload: AddNewMessage = { ...message, id: '', timeStamp: new Date(message.timeStamp).valueOf() };
      dispatch(addNewMessage(payload));
    }

    webSocketContext.socket.on('connect', onConnect);
    webSocketContext.socket.on('disconnect', onDisconnect);
    webSocketContext.socket.on('message-sent', onMessageReceived);

    return () => {
      webSocketContext.socket.off('connect', onConnect);
      webSocketContext.socket.off('disconnect', onDisconnect);
      webSocketContext.socket.off('message-sent', onMessageReceived);
    };
  }, []);

  return (
    <>
      <WebSocketContext.Provider value={webSocketContext}>{children}</WebSocketContext.Provider>
    </>
  );
}

export type WsMessage = {
  chatId: string;
  text: string;
  senderId: string;
  timeStamp: string;
};

export type WsConnectUser = {
  userId: string;
};
