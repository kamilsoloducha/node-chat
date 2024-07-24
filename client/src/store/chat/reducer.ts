import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, ChatHistoryItem, ChatMessage } from 'core/models/chat-history-item';
import { ChatState, initialChatState } from 'store/chat/state';
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

    getChat: (state: ChatState, _: PayloadAction<a.GetChat>) => {
      state.isChatLoading = true;
    },
    getChatSuccessfully: (state: ChatState, action: PayloadAction<Chat>) => {
      state.isChatLoading = false;
      state.selectedChat = action.payload;
    },

    getMessages: (state: ChatState, _: PayloadAction<a.GetMessages>) => {
      state.areMessagesLoading = true;
    },
    getMessagesSuccess: (state: ChatState, action: PayloadAction<ChatMessage[]>) => {
      state.areMessagesLoading = false;
      state.messages = state.messages.concat(action.payload).sort((a, b) => new Date(a.timeStamp).getDate() - new Date(b.timeStamp).getDate());
    },

    changeConnectionStatus: (state: ChatState, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    addNewMessage: (state: ChatState, action: PayloadAction<a.AddNewMessage>) => {
      if (state.selectedChat?.id === action.payload.chatId) {
        state.messages.push({ text: action.payload.text, senderId: action.payload.senderId, timeStamp: new Date(action.payload.timeStamp) });
      }
    },
  },
});

export default chatSlice.reducer;

export const { actionFailed, loadHistory, loadHistorySuccessfully, getChat, getChatSuccessfully, getMessages, getMessagesSuccess, changeConnectionStatus, addNewMessage } = chatSlice.actions;
