import { memo, ReactElement } from 'react';
import { selectIsLoading, selectSelectedChat } from 'store/chat/selectors';
import { useAppDispatch, useAppSelector } from 'store/store';
import * as a from 'store/chat/reducer';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { HistoryItem } from 'pages/main/components/historyItem/historyItem';
import { ChatSearch } from 'pages/main/components/chatSearch/ChatSearch';

export const History = memo(function History(): ReactElement {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectIsLoading);
  const selectedChat = useAppSelector(selectSelectedChat);
  const { get } = useUserStorage();

  const selectChat = (chatId: string) => {
    if (chatId === selectedChat?.id) {
      return;
    }
    const userId = get()?.id!;
    dispatch(a.selectChat({ chatId, userId }));
  };

  return (
    <div className="relative h-full flex flex-col">
      <ChatSearch />
      <div className="relative h-full flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {chats.map((chat) => {
          return (
            <HistoryItem
              key={chat.id}
              chatId={chat.id}
              chatName={chat.name}
              isSelected={chat.id === selectedChat?.id}
              onSelected={selectChat}
            />
          );
        })}
      </div>
    </div>
  );
});
