import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const selectUserLogin = (state: RootState) => state.userLogin;

export const authLoginSelector = createSelector(
  selectUserLogin,
  state => state
);
