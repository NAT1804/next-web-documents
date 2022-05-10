import { createAction } from '@reduxjs/toolkit';

export const increment = createAction('counter/increment');
export const decrement = createAction('counter/decrement');
export const incrementByAmount = createAction<number>(
  'counter/incrementByAmount'
);
