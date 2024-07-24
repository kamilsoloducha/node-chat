import { Chat, ChatHistoryItem, ChatMessage } from 'core/models/chat-history-item';

export type ChatState = {
  isHistoryLoading: boolean;
  historyItems: ChatHistoryItem[];

  selectedChat: Chat | undefined;
  isChatLoading: boolean;
  messages: ChatMessage[];
  areMessagesLoading: boolean;

  isConnected: boolean;
};

export const initialChatState: ChatState = {
  isHistoryLoading: false,
  historyItems: [],

  selectedChat: undefined,
  isChatLoading: false,
  messages: [],
  areMessagesLoading: false,

  isConnected: false,
};
