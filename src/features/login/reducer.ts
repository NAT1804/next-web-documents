import { createReducer } from '@reduxjs/toolkit';
import { authLoginAction } from './actions';

export type AuthLoginState = {
  type: string;
  token: string;
  data: {
    id: number;
    name: string;
    email: string;
    permissions: string[];
  };
  pending: boolean;
  error: boolean;
  message: string;
};

const initialState: AuthLoginState = {
  type: '',
  token: '',
  data: {
    id: 0,
    name: '',
    email: '',
    permissions: []
  },
  pending: false,
  error: false,
  message: ''
};

export const authLoginReducer = createReducer(initialState, builder => {
  builder
    .addCase(authLoginAction.pending, state => {
      state.pending = true;
    })
    .addCase(authLoginAction.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.type = payload.type;
      state.token = payload.token;
      state.data = payload.data;
      state.message = payload.message;
    })
    .addCase(authLoginAction.rejected, state => {
      state.pending = true;
      state.error = true;
    });
});

export default authLoginReducer;
