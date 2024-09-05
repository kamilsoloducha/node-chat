import { Action, PayloadAction } from '@reduxjs/toolkit';
import { mergeMap, Observable, of, switchMap } from 'rxjs';
import {
  actionFailed,
  addToFavourite,
  getChatSuccessfully,
  getPreviousMessages,
  getPreviousMessagesSuccessfully,
  loadHistory,
  loadHistorySuccessfully,
  selectChat,
  updateChatName,
} from 'store/chat/reducer';
import * as api from 'core/http/chat-http-client.service';
import { ofType } from 'redux-observable';
import { AddToFavourite, GetPreviousMessages, SelectChat, UpdateChatName } from 'store/chat/actions';
import { ChatMessage } from 'core/models/chat-history-item';
import { pageSize } from 'store/chat/state';

export const loadHistoryEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    ofType(loadHistory.type),
    mergeMap(async (_) => {
      const response = await api.getUsersChat(1);
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
      const [messagesResponse, chatResponse] = await Promise.all([api.getMessages(action.payload.userId, action.payload.chatId, pageSize), api.getChat(action.payload.chatId)]);
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
      const messagesResponse = await api.getPreviousMessages(action.payload.chatId, action.payload.messageId, pageSize);
      if (messagesResponse.isSuccessful) {
        return getPreviousMessagesSuccessfully(messagesResponse.items.map(mapChatMessages));
      } else {
        return actionFailed();
      }
    }),
  );

export const updateChatNameEpic = (action$: Observable<Action>): Observable<Action | never> =>
  action$.pipe(
    ofType(updateChatName.type),
    mergeMap(async (action: PayloadAction<UpdateChatName>) => {
      const request: api.UpdateChatNameRequest = { name: action.payload.chatName };
      const messagesResponse = await api.updateChatName(action.payload.chatId, request);
      if (messagesResponse.isSuccessful) {
        return {} as never;
      } else {
        return actionFailed();
      }
    }),
  );

export const addToFavouriteEpic = (action$: Observable<Action>): Observable<Action | never> =>
  action$.pipe(
    ofType(addToFavourite.type),
    mergeMap(async (action: PayloadAction<AddToFavourite>) => {
      const messagesResponse = await api.addToFavorite(action.payload.chatId, action.payload.userId);
      if (messagesResponse.isSuccessful) {
        return {} as never;
      } else {
        return actionFailed();
      }
    }),
  );

const mapChatMessages = (item: ChatMessage): ChatMessage => {
  return { ...item, timeStamp: new Date(item.timeStamp).valueOf() };
};
