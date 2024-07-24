import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { ChatState } from 'store/chat/state';
import { filter, mergeMap, Observable, tap } from 'rxjs';
import { actionFailed, loadHistory, loadHistorySuccessfully } from 'store/chat/reducer';
import { getUsersChat } from 'core/http/chat-http-client.service';

export const loadHistoryEpic = (action$: Observable<Action>): Observable<Action> =>
  action$.pipe(
    tap((action) => console.log(action)),
    filter((action) => action.type === loadHistory.type),
    mergeMap(async (_) => {
      const response = await getUsersChat(1);
      if (response.isSuccessful) {
        return loadHistorySuccessfully(response.items);
      } else {
        return actionFailed();
      }
    }),
  );
