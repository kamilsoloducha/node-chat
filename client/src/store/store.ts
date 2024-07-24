import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { loadHistoryEpic } from 'store/chat/epics';
import chatReducer from 'store/chat/reducer';

export const rootEpic = combineEpics(loadHistoryEpic as any);
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({ reducer: { chatReducer }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware) });
epicMiddleware.run(rootEpic);

export type MainState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<MainState> = useSelector;
