import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sessionStorage from 'redux-persist/es/storage';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from '../reducers/AuthReducer';
import formReducer from '../reducers/formReducer';
import questionReducer from '../reducers/questionReducer';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['login', 'form'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  questions: questionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
export const persistor = persistStore(store);
