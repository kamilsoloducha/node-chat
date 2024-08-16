import { memo, ReactElement } from 'react';
import { selectSelectedChat } from 'store/chat/selectors';
import { useAppSelector } from 'store/store';
import { MessageInput } from 'pages/main/components/messageInput/messageInput';
import { MessagesContainer } from 'pages/main/components/messagesContainer/messagesContainer';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { ChatHeader } from 'pages/main/components/chatHeader/ChatHeader';

export const Chat = memo(function Chat(): ReactElement {
  const selectedChat = useAppSelector(selectSelectedChat);
  const userId = useUserStorage().get()?.id ?? '';

  if (!selectedChat) {
    return <></>;
  }

  return (
    <div className="relative h-full flex flex-col">
      <ChatHeader
        id={selectedChat.id}
        name={selectedChat.name}
      />
      <div className="flex-1 overflow-y-auto">
        <MessagesContainer chatId={selectedChat.id} />
      </div>
      <footer className=" bg-blue-400 w-full">
        <MessageInput
          chatId={selectedChat.id}
          userId={userId}
        />
      </footer>
    </div>
  );
});
