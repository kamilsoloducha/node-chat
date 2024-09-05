import { useUserStorage } from 'core/hooks/useUserStorage';
import { MessagesSet } from 'pages/main/components/messagesSet/messagesSet';
import { Fragment, ReactElement, useEffect, useRef } from 'react';
import { selectMessages, selectAreMessagesLoading } from 'store/chat/selectors';
import { useAppDispatch, useAppSelector } from 'store/store';
import * as a from 'store/chat/reducer';
import { ChatMessage } from 'core/models/chat-history-item';

type MessagesContainerProps = {
  chatId: string;
};

export function MessagesContainer({ chatId }: MessagesContainerProps): ReactElement {
  const userId = useUserStorage().get()?.id ?? '';
  const dispatch = useAppDispatch();
  const initialScrollDone = useRef<boolean>(false);
  const messages = useAppSelector(selectMessages);
  const sortedMessages = splitOnGroup(messages);
  const areMessagesLoading = useAppSelector(selectAreMessagesLoading);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.at(-1) && messages.at(-1)?.id === '') {
      scrollToBottom();
    }

    if (!initialScrollDone.current && messages.length > 0) {
      scrollToBottom();
      initialScrollDone.current = true;
    }
  }, [messages]);

  useEffect(() => {
    initialScrollDone.current = false;
  }, [chatId]);

  const loadMoreMessages = () => {
    if (areMessagesLoading) {
      return;
    }

    dispatch(a.getPreviousMessages({ chatId, messageId: sortedMessages[0].messages[0].id }));
  };
  return (
    <>
      <div
        className="relative px-40"
        ref={containerRef}
      >
        <div className="flex justify-center">
          <button
            className="hover:shadow-md px-4"
            onClick={loadMoreMessages}
          >
            <div className="flex flex-col justify-center items-center">
              Load more
              <img
                className="m-2"
                src="./double-arrow-down.svg"
                width="32px"
                height="32px"
              />
            </div>
          </button>
        </div>
        {sortedMessages.map((group, index) => {
          return (
            <Fragment key={index}>
              <MessagesSet
                senderId={group.senderId}
                messages={group.messages}
                alignment={group.senderId === userId ? 'right' : 'left'}
                key={index}
              />
            </Fragment>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
    </>
  );
}

function splitOnGroup(messages: ChatMessage[]): MessageGroup[] {
  const result: MessageGroup[] = [];
  let previousMessage: ChatMessage | undefined;

  if (messages.length > 0) {
    previousMessage = messages[0];
    result.push({ senderId: messages[0].senderId, messages: [messages[0]] });
  }

  for (let i = 1; i < messages.length; i++) {
    const currentMessage = messages[i];
    if (currentMessage.senderId === previousMessage?.senderId && new Date(currentMessage.timeStamp).isSameDay(previousMessage.timeStamp)) {
      result.at(-1)?.messages.push(messages[i]);
    } else {
      const newGroup: MessageGroup = {
        senderId: messages[i].senderId,
        messages: [messages[i]],
      };
      result.push(newGroup);
    }
    previousMessage = currentMessage;
  }

  return result;
}

type MessageGroup = {
  senderId: string;
  messages: ChatMessage[];
};
