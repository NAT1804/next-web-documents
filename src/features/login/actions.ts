import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authLoginAction = createAsyncThunk(
  'auth/login',
  async (dataLogin: { email: string; password: string }) => {
    // console.log(process.env.HOST);
    const response = await axios.post(
      'http://127.0.0.1:8000/api/auth/login',
      dataLogin
    );

    return response.data;
  }
);
