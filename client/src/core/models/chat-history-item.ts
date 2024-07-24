export type ChatUser = {
  id: string;
  name: string;
};

export type Chat = {
  id: string;
  name: string;
  users: ChatUser[];
};

export type ChatHistoryItem = {
  id: string;
  name: string;
};

export type ChatMessage = {
  text: string;
  senderId: string;
  timeStamp: number;
};
