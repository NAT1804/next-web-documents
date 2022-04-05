import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import type { RootState } from 'app/store';
import { stat } from 'fs';

export type KanyeState = {
  data: { quote: string };
  pending: boolean;
  error: boolean;
};

const initialState: KanyeState = {
  data: { quote: 'Click that button' },
  pending: false,
  error: false
};

export const getKanyeQuote = createAsyncThunk('kanye/kanyeQuote', async () => {
  const response: AxiosResponse = await axios.get('https://api.kanye.rest');

  return response.data;
});

export const kanyeSlice = createSlice({
  name: 'kanye',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getKanyeQuote.pending, state => {
        state.pending = true;
      })
      .addCase(getKanyeQuote.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getKanyeQuote.rejected, state => {
        state.error = true;
        state.pending = true;
      });
  }
});

export const selectKanye = (state: RootState) => state.kanyeQuote;

export default kanyeSlice.reducer;
