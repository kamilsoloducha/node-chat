import { MainState } from 'store/store';

export const selectIsLoading = (state: MainState) => state.chatReducer.historyItems;

export const selectAreMessagesLoading = (state: MainState) => state.chatReducer.areMessagesLoading;
export const selectMessages = (state: MainState) => state.chatReducer.messages;
export const selectSelectedChat = (state: MainState) => state.chatReducer.selectedChat;
