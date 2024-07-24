import { useUserStorage } from 'core/hooks/useUserStorage';
import { socketProvider } from 'core/websockets/socket.service';
import { WsMessage } from 'core/websockets/websocket';
import { ReactElement, useState } from 'react';

export function Chat(): ReactElement {
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    const { get } = useUserStorage();
    const userId = get()?.id ?? '';
    const wsMessage: WsMessage = {
      chatId: '1',
      text: message,
      senderId: userId,
      timeStamp: new Date().toString(),
    };
    socketProvider.sendMessage(wsMessage);
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Enter a message..."
        autoComplete="off"
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}
