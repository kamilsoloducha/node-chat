import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatHistoryItem, ChatMessage } from 'core/models/chat-history-item';
import { ChatState, initialChatState, pageSize } from 'store/chat/state';
import * as a from 'store/chat/actions';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    actionFailed: (state: ChatState): void => {},

    loadHistory: (state: ChatState): void => {
      state.isHistoryLoading = true;
    },
    loadHistorySuccessfully: (state: ChatState, action: PayloadAction<ChatHistoryItem[]>) => {
      state.isHistoryLoading = false;
      state.historyItems = action.payload;
    },

    selectChat: (state: ChatState, _: PayloadAction<a.SelectChat>) => {
      state.isChatLoading = true;
    },
    getChatSuccessfully: (state: ChatState, action: PayloadAction<a.SelectChatSuccessfully>) => {
      state.isChatLoading = false;
      state.messages = action.payload.message;
      state.selectedChat = action.payload.chat;
    },

    getMessages: (state: ChatState, _: PayloadAction<a.GetMessages>) => {
      state.areMessagesLoading = true;
    },
    getMessagesSuccess: (state: ChatState, action: PayloadAction<ChatMessage[]>) => {
      state.areMessagesLoading = false;
      state.messages = state.messages.concat(action.payload).sort((a, b) => new Date(a.timeStamp).getDate() - new Date(b.timeStamp).getDate());
      state.isAllLoaded = action.payload.length !== pageSize;
    },

    getPreviousMessages: (state: ChatState, _: PayloadAction<a.GetPreviousMessages>) => {
      state.isChatLoading = true;
    },

    getPreviousMessagesSuccessfully: (state: ChatState, action: PayloadAction<ChatMessage[]>) => {
      state.isChatLoading = false;
      state.messages = state.messages.concat(action.payload).sort((a, b) => new Date(a.timeStamp).getDate() - new Date(b.timeStamp).getDate());
      state.isAllLoaded = action.payload.length !== pageSize;
    },

    changeConnectionStatus: (state: ChatState, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    addNewMessage: (state: ChatState, action: PayloadAction<a.AddNewMessage>) => {
      if (state.selectedChat?.id === action.payload.chatId) {
        state.messages.push({ id: '', text: action.payload.text, senderId: action.payload.senderId, timeStamp: new Date(action.payload.timeStamp).valueOf() });
      }
    },

    sendMessage: (state: ChatState, action: PayloadAction<a.SendMessage>) => {
      state.messages.push({ ...action.payload, timeStamp: new Date().valueOf(), id: '' });
    },

    updateChatName: (state: ChatState, action: PayloadAction<a.UpdateChatName>) => {
      const historyItem = state.historyItems.find((x) => x.id === action.payload.chatId);
      historyItem!.name = action.payload.chatName;
    },

    addToFavourite: (_: ChatState, action: PayloadAction<a.AddToFavourite>) => {},
  },
});

export default chatSlice.reducer;

export const {
  actionFailed,
  loadHistory,
  loadHistorySuccessfully,
  selectChat,
  getChatSuccessfully,
  getMessages,
  getMessagesSuccess,
  changeConnectionStatus,
  addNewMessage,
  sendMessage,
  getPreviousMessages,
  getPreviousMessagesSuccessfully,
  updateChatName,
  addToFavourite,
} = chatSlice.actions;
