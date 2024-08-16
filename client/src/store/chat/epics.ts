import { Action, PayloadAction } from '@reduxjs/toolkit';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { actionFailed, getChatSuccessfully, getPreviousMessages, getPreviousMessagesSuccessfully, loadHistory, loadHistorySuccessfully, selectChat } from 'store/chat/reducer';
import { getChat, getMessages, getUsersChat, getPreviousMessages as apiGetPreviousMessages } from 'core/http/chat-http-client.service';
import { ofType } from 'redux-observable';
import { GetPreviousMessages, SelectChat } from 'store/chat/actions';
import { ChatMessage } from 'core/models/chat-history-item';
import { pageSize } from 'store/chat/state';

export const loadHistoryEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(loadHistory.type),
    mergeMap(async (_) => {
      const response = await getUsersChat(1);
      if (response.isSuccessful) {
        return loadHistorySuccessfully(response.items);
      } else {
        return actionFailed();
      }
    }),
  );

export const selectChatEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(selectChat.type),
    switchMap(async (action: PayloadAction<SelectChat>) => {
      const [messagesResponse, chatResponse] = await Promise.all([getMessages(action.payload.userId, action.payload.chatId, pageSize), getChat(action.payload.chatId)]);
      if (messagesResponse.isSuccessful && chatResponse.isSuccessful) {
        return getChatSuccessfully({
          message: messagesResponse.items.map(mapChatMessages),
          chat: chatResponse.chat,
        });
      } else {
        return actionFailed();
      }
    }),
  );

export const getPreviousMessagesEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(getPreviousMessages.type),
    switchMap(async (action: PayloadAction<GetPreviousMessages>) => {
      const messagesResponse = await apiGetPreviousMessages(action.payload.chatId, action.payload.messageId, pageSize);
      if (messagesResponse.isSuccessful) {
        return getPreviousMessagesSuccessfully(messagesResponse.items.map(mapChatMessages));
      } else {
        return actionFailed();
      }
    }),
  );

const mapChatMessages = (item: ChatMessage): ChatMessage => {
  return { ...item, timeStamp: new Date(item.timeStamp).valueOf() };
};
