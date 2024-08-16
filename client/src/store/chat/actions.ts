import { Chat, ChatMessage } from 'core/models/chat-history-item';

export type SelectChat = {
  chatId: string;
  userId: string;
};

export type SelectChatSuccessfully = {
  chat: Chat;
  message: ChatMessage[];
};

export type GetMessages = {
  chatId: string;
  userId: string;
};

export type AddNewMessage = {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  timeStamp: number;
};

export type SendMessage = {
  chatId: string;
  senderId: string;
  text: string;
};

export type GetPreviousMessages = {
  chatId: string;
  messageId: string;
};

export type UpdateChatName = {
  chatId: string;
  chatName: string;
};
