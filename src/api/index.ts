import axios from 'axios';
import { getSession } from 'next-auth/react';
import qs from 'qs';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: params => qs.stringify(params, { encode: false })
});

api.interceptors.request.use(async config => {
  const session = await getSession();

  config.headers.Authorization = `Bearer ${session?.accessToken}`;

  return config;
});

export const fetcher = url => api.get(url).then(res => res.data);

export default api;
