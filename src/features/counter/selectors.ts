import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const selectCount = (state: RootState) => state.counter.value;

export const countSelector = createSelector(selectCount, state => state);
