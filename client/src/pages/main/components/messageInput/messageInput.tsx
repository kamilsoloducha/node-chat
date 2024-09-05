import { socketProvider } from 'core/websockets/socket.service';
import { WsMessage } from 'core/websockets/websocket';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'store/store';
import * as a from 'store/chat/reducer';

type MessageInputProps = {
  chatId: string;
  userId: string;
};

export function MessageInput({ chatId, userId }: MessageInputProps): ReactElement {
  const dispatch = useAppDispatch();
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const ref = useRef(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };

    const keyUpListener = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    document.addEventListener('keydown', keyDownListener);
    document.addEventListener('keyup', keyUpListener);

    return () => {
      document.removeEventListener('keydown', keyDownListener);
      document.removeEventListener('keyup', keyUpListener);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim().length === 0) {
      return;
    }

    const wsMessage: WsMessage = {
      chatId,
      text: message,
      senderId: userId,
      timeStamp: new Date().toString(),
    };

    socketProvider.sendMessage(wsMessage);
    dispatch(a.sendMessage({ ...wsMessage }));
    setMessage('');
  };

  return (
    <form
      ref={ref}
      className="relative flex flex-row m-5"
      onSubmit={submit}
    >
      <textarea
        className="w-full h-fit p-3 rounded-md resize-none pr-10"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!isShiftPressed) {
              sendMessage();
              e.preventDefault();
            }
          }
        }}
        rows={findRowsCount(message)}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Enter a message..."
        autoComplete="off"
      />
      <button
        className="absolute right-5 top-0 bottom-0"
        onClick={sendMessage}
      >
        <img
          src="./send.svg"
          alt="Icon description"
          width="32px"
          height="32px"
        ></img>
      </button>
    </form>
  );
}

const findRowsCount = (message: string): number => {
  const lines = message.split('').filter((x) => x === '\n').length + 1;
  return lines < 5 ? lines : 5;
};
