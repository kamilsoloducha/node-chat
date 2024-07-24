export type ChatUser = {
  id: number;
  name: string;
};

export type Chat = {
  id: number;
  name: string;
  users: ChatUser[];
};

export type ChatHistoryItem = {
  id: number;
  name: string;
};

export type ChatMessage = {
  text: string;
  senderId: number;
  timeStamp: string;
};
