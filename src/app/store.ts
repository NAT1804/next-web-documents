import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { counterReducer, authLoginReducer } from '../features';
import kanyeReducer from '../features/kanye/kanyeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    kanyeQuote: kanyeReducer,
    userLogin: authLoginReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
