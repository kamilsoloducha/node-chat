export type GetChat = {
  chatId: number;
};

export type GetMessages = {
  chatId: number;
};

export type AddNewMessage = {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  timeStamp: number;
};
