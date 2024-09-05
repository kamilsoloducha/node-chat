import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { loadHistoryEpic, selectChatEpic, getPreviousMessagesEpic, updateChatNameEpic, addToFavouriteEpic } from 'store/chat/epics';
import chatReducer from 'store/chat/reducer';

export const rootEpic = combineEpics(loadHistoryEpic as any, selectChatEpic as any, getPreviousMessagesEpic as any, updateChatNameEpic as any, addToFavouriteEpic as any);
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({ reducer: { chatReducer }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware) });
epicMiddleware.run(rootEpic);

export type MainState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<MainState> = useSelector;
