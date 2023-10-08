/* eslint-disable import/named */
import store from '~/configStore/storeRedux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type InjectSelector<T> = RootState & T;

type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
